using System;
using System.IO;
using System.Net;
using System.Text;
using System.Xml;

namespace GamblerServiceExampleClient
{
    /// <summary>
    /// IMPORTANT: This class is meant as an example only. The purpose of this example is to show how to call services 
    /// using basic http authorization in .NET. See method 'SetCredentials(HttpWebRequest request)'.
    /// 
    /// This class does not take into account thread safety in multi-threaded environments and it is not optimized 
    /// for performance. These factors need to be considered by developers using the code from this example. Also note 
    /// that in production SSL will be used and at that time the SSL certificate needs to be installed and the 
    /// end-points need to be updated - so it is recommended to make end-points configurable.
    /// 
    /// The web service used as an example in this code is the "GamblerService" and the operation "GamblerCheck". 
    /// This service checks if a player is registered as a problem gambler. 
    /// 
    /// Consider using a web service proxy in stead of hard coding the XML structures as done in this example:
    /// http://msdn.microsoft.com/en-us/library/w3h45ebk(v=VS.400).aspx
    /// </summary>
    class GamblerServiceExampleClient
    {
        /// <summary>
        /// This main method calls a number of utility methods to determine if the hardcoded CPR number is registered
        /// as a problem gambler.
        /// </summary>
        /// <param name="args">No args required. CPR number is hardcoded</param>
        static void Main(string[] args)
        {
            HttpWebRequest request = SetupRequest();

            String xmlAsString = SetupRequestDocument("1111111111").InnerXml;
            UTF8Encoding encoding = new UTF8Encoding();
            byte[] requestXmlAsBytes = encoding.GetBytes(xmlAsString);
            request.ContentLength = (long) requestXmlAsBytes.Length;

            Stream requestStream = request.GetRequestStream();
            requestStream.Write(requestXmlAsBytes, 0, requestXmlAsBytes.Length);
            requestStream.Close();

            string responseAsString = GetResponse(request);
            if (responseAsString == null || responseAsString.Equals("", StringComparison.OrdinalIgnoreCase) || !IsUserRegistered(responseAsString))
            {
                Console.Out.WriteLine("Gambler is not registered as a problem gambler.");
                System.Threading.Thread.Sleep(5000);
                return;
            }

            Console.Out.WriteLine("Gambler is registered as a problem gambler.");
            System.Threading.Thread.Sleep(5000);
        }

        // The name of the gambler status element from the response.
        private static string GamblerStatusElement = "ExclusionStatus";
        // Response string if the requested player has temporarily registered as a problem gambler.
        private static string TemporaryExcluded = "PersonIsRegisteredTemporarily";
        // Response string if the requested player has permanently registered as a problem gambler.
        private static string PermanentlyExcluded = "PersonIsRegisteredIndefinitely"; 

        /// <summary>
        /// Method used to determine if the response from the service reports that the requested player has been registered
        /// as a problem gambler.
        /// </summary>
        /// <param name="responseAsString">The complete response from the GamblerCheck operation as a string.</param>
        /// <returns>True if the player has been registered as a problem gambler.</returns>
        private static bool IsUserRegistered(string responseAsString)
        {
            XmlDocument responseDoc = new XmlDocument();
            responseDoc.LoadXml(responseAsString);
            XmlNodeList responseList = responseDoc.GetElementsByTagName(GamblerStatusElement);
            if (responseList.Count > 0 && responseList.Item(0).InnerText != null)
            {
                return (responseList.Item(0).InnerText.Equals(TemporaryExcluded, StringComparison.OrdinalIgnoreCase) || responseList.Item(0).InnerText.Equals(PermanentlyExcluded, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        /// <summary>
        /// Gets the response from the service using the request object.
        /// </summary>
        /// <param name="request">The request object to get the response from.</param>
        /// <returns>The complete response from the service as a string.</returns>
        private static string GetResponse(HttpWebRequest request)
        {
            string responseAsString = "";
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                StreamReader readStream = new StreamReader(responseStream, Encoding.UTF8);
                responseAsString = readStream.ReadToEnd();
                response.Close();
                readStream.Close();
            }
            catch (Exception e)
            {
                Console.Out.WriteLine("An error occured: " + e.Message);
            }

            return responseAsString;

        }

        // The uri to the gambler service.
        private static readonly Uri ServiceUri = new Uri("http://213.174.72.41:7001/GamblerProject/GamblerService");

        /// <summary>
        /// This method sets up a new reequest object which will be used to call the operation 'GamblerCheck' on 'GamblerService'.
        /// </summary>
        /// <returns>A HttpWebRequest object with all the necessary headers set.</returns>
        private static HttpWebRequest SetupRequest()
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(ServiceUri);
            request.ContentType = "text/xml; charset=\"utf-8\"";
            request.Method = "POST";
            request.Accept = "text/xml; charset=\"utf-8\"";
            request.Headers.Add("SOAPAction", "\"\"");
            SetCredentials(request);
            
            return request;
        }

        // Replace 'user_name' with the user name provided by Spillemyndigheden.
        private static String UserName = "user_name";
        // Replace 'password' with the password provided by Spillemyndigheden.
        private static String Password = "password";

        /// <summary>
        /// This method sets the required user name and password on the request object; thus enabling basic http
        /// authorization.
        /// </summary>
        /// <param name="request">The HttpWebRequest to set the parameters on.</param>
        private static void SetCredentials(HttpWebRequest request)
        {
            string authInfo = UserName + ":" + Password;    
            authInfo = Convert.ToBase64String(Encoding.Default.GetBytes(authInfo));    
            request.Headers["Authorization"] = "Basic " + authInfo;
        }

        private static string SoapEnvelopeNamespaceUri = "http://schemas.xmlsoap.org/soap/envelope/";
        private static string SoapEnvelopePrefix = "soapEnv";
        private static string LurGamblerServiceNamespaceUri = "http://services.lur.skat.dk";
        private static string LurGamblerServicePrefix = "ser";

        /// <summary>
        /// This method sets up, and returns, a complete SOAP envelope which can be sent to the GamblerService web service.
        /// </summary>
        /// <param name="cprNumber">The CPR number of the player to check in the register.</param>
        /// <returns>A SAOP request as a XmlDocument object.</returns>
        private static XmlDocument SetupRequestDocument(String cprNumber)
        {
            XmlDocument xmlDoc = new XmlDocument();
            XmlNode xmlnode= xmlDoc.CreateNode(XmlNodeType.XmlDeclaration,"","");
            xmlDoc.AppendChild(xmlnode);

            //SOAP envelope element.
            XmlElement envelopeRootElement = xmlDoc.CreateElement(SoapEnvelopePrefix, "Envelope", SoapEnvelopeNamespaceUri);
            //SOAP header
            envelopeRootElement.AppendChild(xmlDoc.CreateElement(SoapEnvelopePrefix, "Header", SoapEnvelopeNamespaceUri));
            //SOAP body
            XmlElement soapBody = xmlDoc.CreateElement(SoapEnvelopePrefix, "Body", SoapEnvelopeNamespaceUri);
            XmlElement gamblerSearchRequestElement = xmlDoc.CreateElement(LurGamblerServicePrefix, "GamblerCheckRequest", LurGamblerServiceNamespaceUri);
            //setup the context
            XmlElement contextElement = xmlDoc.CreateElement("Kontekst");
            contextElement.AppendChild(GetNewContext(xmlDoc));
            gamblerSearchRequestElement.AppendChild(contextElement);
            gamblerSearchRequestElement.AppendChild(GetGamblerRequestBody(cprNumber, xmlDoc));
            //Add context and request to the SOAP body
            soapBody.AppendChild(gamblerSearchRequestElement);
            //Add the body to the envelope
            envelopeRootElement.AppendChild(soapBody);
            //Add everything to the document.
            xmlDoc.AppendChild(envelopeRootElement);
            return xmlDoc;
        }

        /// <summary>
        /// This method generates the GamblerCheck request part of the SOAP message.
        /// </summary>
        /// <param name="cprNumber">The CPR number of the player to check.</param>
        /// <param name="xmlDoc">The XML document to use.</param>
        /// <returns>A new GamblerCheck request part.</returns>
        private static XmlElement GetGamblerRequestBody(string cprNumber, XmlDocument xmlDoc)
        {
            XmlElement personOplysningelement = xmlDoc.CreateElement("PersonInformation");
            XmlElement personCprElement = xmlDoc.CreateElement("PersonCPRNumber");
            XmlText personCprElementText = xmlDoc.CreateTextNode(cprNumber);
            personCprElement.AppendChild(personCprElementText);
            personOplysningelement.AppendChild(personCprElement);
            return personOplysningelement;
        }

        private static string HovedOplysningerNamespaceUri = "http://skat.dk/begrebsmodel/xml/schemas/kontekst/2007/05/31/";

        /// <summary>
        /// This method generates the required context part of requests sent to the gambler services.
        /// </summary>
        /// <param name="xmlDoc">The XML document to use.</param>
        /// <returns>A new context part.</returns>
        private static XmlElement GetNewContext(XmlDocument xmlDoc)
        {
            XmlElement hovedOplysningerElement = xmlDoc.CreateElement("ns1", "HovedOplysningerType", HovedOplysningerNamespaceUri);
            hovedOplysningerElement.AppendChild(GetNewTransactionIdElement(xmlDoc));
            hovedOplysningerElement.AppendChild(GetNewTransactionTimeElement(xmlDoc));
            return hovedOplysningerElement;
        }

        // Transaction time element name.
        private static string TransactionTimeElementName = "TransaktionsTid";

        /// <summary>
        /// This method returns a new transaction time XmlElement to be used as part of the context element.
        /// </summary>
        /// <param name="xmlDoc">The XML document to use.</param>
        /// <returns>A new transaction time XmlElement.</returns>
        private static XmlElement GetNewTransactionTimeElement(XmlDocument xmlDoc)
        {
            XmlElement transactionTimeElement = xmlDoc.CreateElement("", TransactionTimeElementName, "");
            XmlText transactionTimeElementText = xmlDoc.CreateTextNode((new DateTime()).ToString());
            transactionTimeElement.AppendChild(transactionTimeElementText);
            return transactionTimeElement;
        }

        // Transaction ID element name.
        private static string TransactionIdElementName = "TransaktionsID";

        /// <summary>
        /// This method returns a new transaction id XmlElement to be used as part of the context element.
        /// </summary>
        /// <param name="xmlDoc">The XML document to use.</param>
        /// <returns>A new transaction id XmlElement.</returns>
        private static XmlNode GetNewTransactionIdElement(XmlDocument xmlDoc)
        {
            XmlElement transactionIdElement = xmlDoc.CreateElement("", TransactionIdElementName, "");
            XmlText transactionIdElementText = xmlDoc.CreateTextNode(UserName + (new DateTime().ToString()) + 'r' + (int)((new Random()).Next() * 100000));
            transactionIdElement.AppendChild(transactionIdElementText);
            return transactionIdElement;
        }

    }
}
