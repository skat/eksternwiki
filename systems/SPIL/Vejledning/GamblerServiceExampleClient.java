package dk.skat.lur.examples.webservice;

import java.net.Authenticator;
import java.net.MalformedURLException;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.Date;

import javax.xml.namespace.QName;

import org.apache.axiom.om.OMAbstractFactory;
import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.OMFactory;
import org.apache.axiom.om.OMNamespace;
import org.apache.axis2.AxisFault;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.axis2.description.AxisService;
import org.apache.axis2.transport.http.HTTPConstants;
import org.apache.axis2.transport.http.HttpTransportProperties;

/**
 * IMPORTANT: This class is meant as an example only. The purpose of this example is to show how to retrieve
 * web service descriptions using basic http authorization and how to call services using basic http authorization
 * in Java.
 * 
 * This class does not take into account thread safety in multi-threaded environments and it is not optimized
 * for performance. These factors need to be considered by developers using the code from this example. Also note
 * that in production SSL will be used and at that time the SSL certificate needs to be installed and the 
 * end-points need to be updated - so it is recommended to make end-points configurable.
 * 
 * The web service used as an example in this code is the "GamblerService" and the operation "GamblerCheck".
 * This service checks if a player is registered as a problem gambler.
 * 
 * The shared libraries this code relies on can all be found in: 
 * http://www.eu.apache.org/dist/axis/axis2/java/core/1.5.4/axis2-1.5.4-bin.zip
 * 
 */
public class GamblerServiceExampleClient {

	private static final String LUR_SERVICE_WSDL_ENDPOINT_NON_SSL = "http://213.174.72.41:7001/GamblerProject/GamblerService?wsdl";
	private static final String LUR_SERVICE_ENDPOINT_NON_SSL = "http://213.174.72.41:7001/GamblerProject/GamblerService";
	private static final String LUR_SERVICE_NAMESPCE_URI = "http://services.lur.skat.dk";
	private static final String LUR_SERVICE_LOCAL_PART = "GamblerService";
	private static final String LUR_SERVICE_PORT_NAME = "GamblerServiceSOAP";
	private static final String GAMBLERCHECK_OPERATION_NAME = "GamblerCheck";

	/** Replace 'user_name' with the user name provided by Spillemyndigheden. */
	private static final String USERNAME = "user_name";
	/** Replace 'password' with the password provided by Spillemyndigheden. */
	private static final String PASSWORD = "password";
	/** End-point point to the GamblerService. */
	private static EndpointReference targetEPR = new EndpointReference(LUR_SERVICE_ENDPOINT_NON_SSL);
	
	private static AxisService lurAxisService = null;
	
	/** This method overrides the configuration of the default Authenticator. */
	private static void setDefaultAuthenticator() {
		Authenticator.setDefault(new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(
						USERNAME,
						PASSWORD.toCharArray());
				} 
			}); 
	}
	
	/**
	 * This method returns the class' AxisService. Since the WSDL is retrieved and parsed every time createClientSideAxisService 
	 * is called it is very important to call createClientSideAxisService as few times as possible.
	 * 
	 * @return The class' AxisService.
	 */
	private static AxisService getLurAxisService() {
		if(lurAxisService != null) {
			return lurAxisService;
		}
		try {
			// We need to override the default Authenticator so that it will retrieve the WSDL using basic http authorization. "createClientSideAxisService"
			// always uses the default Authenticator no matter what options are supplied.
			setDefaultAuthenticator();
			lurAxisService = AxisService.createClientSideAxisService(new URL(LUR_SERVICE_WSDL_ENDPOINT_NON_SSL), new QName(LUR_SERVICE_NAMESPCE_URI, LUR_SERVICE_LOCAL_PART),
					LUR_SERVICE_PORT_NAME, new Options());
		} catch (AxisFault e) {
			e.printStackTrace();
			return null;
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		}
		return lurAxisService;
	}
	
	/**
	 * Calls GamblerCheck with the supplied CPR number and return the service response. NULL is returned if the service
	 * does not reply in the expected format.
	 * 
	 * @param cprNumber The CPR number of the current player.
	 * @return The response from GamblerCheck.
	 * @throws AxisFault If client operations fails.
	 */
	public static String callGamblerCheckService(String cprNumber) throws AxisFault {
		// Generate client based on the WSDL.
		ServiceClient client = new ServiceClient(null, getLurAxisService());	
		client.setOptions(getBasicHttpAuthOptions());
		client.setTargetEPR(targetEPR);
		
		OMElement ret = client.sendReceive(new QName(GAMBLERCHECK_OPERATION_NAME), getGamblerCheckPayload(cprNumber));
		OMElement data = ret != null ? ret.getFirstChildWithName(new QName("ExclusionStatus")) : null;
		OMElement value = data != null ? data.getFirstChildWithName(new QName("GamblerExclusionStatus")) : null ;
		String response = value != null ? value.getText() : null;

		return response;
	}

	/**
	 * This method creates a new set of options specifying that basic http authorization is to be used and includes
	 * the user name and the password.
	 * 
	 * @return The new basic http options.
	 */
	private static Options getBasicHttpAuthOptions() {
		Options options = new Options();

		HttpTransportProperties.Authenticator authenticator = new HttpTransportProperties.Authenticator();
		authenticator.setPreemptiveAuthentication(true);
		authenticator.setRealm(HttpTransportProperties.Authenticator.BASIC);

		authenticator.setUsername(USERNAME);
		authenticator.setPassword(PASSWORD);
		
		options.setProperty(HTTPConstants.AUTHENTICATE, authenticator);
		
		return options;
	}

	/**
	 * This method is used to create the required "Kontekst" which should be used on all requests.
	 * 
	 * @return The newly generated context.
	 */
	public static OMElement getNewContext() {

		OMFactory fac = OMAbstractFactory.getOMFactory();
		OMElement context = fac.createOMElement(new QName("Kontekst"));
		//Setup the HovedOplysninger
		OMNamespace hovedOplysningerNs = fac.createOMNamespace("http://skat.dk/begrebsmodel/xml/schemas/kontekst/2007/05/31/", "ns1");
		OMElement hovedOplysninger = fac.createOMElement("HovedOplysningerType", hovedOplysningerNs);
		OMElement transaktionsID = fac.createOMElement("TransaktionsID", hovedOplysningerNs);
		transaktionsID.addChild(fac.createOMText(transaktionsID, USERNAME + (new Date().toString()) + 'r'
				+ (int) (Math.random() * 100000)));
		OMElement transaktionsTid = fac.createOMElement("TransaktionsTid", hovedOplysningerNs);
		transaktionsTid.addChild(fac.createOMText(transaktionsTid, (new Date().toString())));
		//Add the new HovedOplysninger to the new context
		hovedOplysninger.addChild(transaktionsID);
		hovedOplysninger.addChild(transaktionsTid);
		context.addChild(hovedOplysninger);
		
		return context;

	}

	private static final String GAMBBLER_SEARCH_OPERATION_NAME = "GamblerCheckRequest";
	private static final String PERSON_INFORMATION_ELEMENT_NAME = "PersonInformation";
	private static final String PERSON_CPR_NUMBER = "PersonCPRNumber";
	
	/**
	 * This method creates the actual GamblerCheck request payload based on the supplied CPR number.
	 * 
	 * @param cprNumber The current player's CPR number.
	 * @return The GamblerCheck payload as an OMElement.
	 */
	public static OMElement getGamblerCheckPayload(String cprNumber) {
		OMFactory fac = OMAbstractFactory.getOMFactory();
		OMNamespace omNs = fac.createOMNamespace("http://services.lur.skat.dk", "ser");

		OMElement method = fac.createOMElement(GAMBBLER_SEARCH_OPERATION_NAME, omNs);
		OMElement personOplysning = fac.createOMElement(new QName(PERSON_INFORMATION_ELEMENT_NAME));
		OMElement personummer = fac.createOMElement(new QName(PERSON_CPR_NUMBER));
		personummer.addChild(fac.createOMText(personummer, cprNumber));
		method.addChild(getNewContext());
		personOplysning.addChild(personummer);
		method.addChild(personOplysning);
		return method;
	}

	/**
	 * Creates a semi-random CPR number. !Should never be used in an actual solution!.
	 * 
	 * @return The generated CPR-number.
	 */
	private static String generateRandomCPR() {
		return "120678"	+ (Long.toString((long) (Math.random() * 1000000000000L)).substring(0, 4));
	}
	
	private static final String TEMPORARY_EXCLUDED = "PersonIsRegisteredTemporarily";
	private static final String PERMANENTLY_EXCLUDED = "PersonIsRegisteredIndefinitely"; 
	
	/**
	 * Determines if a player is registered as a problem gambler based on the service response. Errors are interpreted 
	 * as the player is not registered. 
	 * 
	 * @param response The response form the GamblerService.
	 * @return If the user is registered.
	 */
	private static final boolean isUserRegistered(String response) {
		if(response != null) {
			if(response.equalsIgnoreCase(TEMPORARY_EXCLUDED) || response.equalsIgnoreCase(PERMANENTLY_EXCLUDED)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Main method. Prints whether or not the randomly generated CPR number is registered as a problem gambler.
	 * @param args No arguments need to be supplied.
	 */
	public static void main(String[] args) {
		try {
			System.out.println("Is user registered as a problem gambler: " + isUserRegistered(callGamblerCheckService(generateRandomCPR())));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
