public class ByteArrayHandler {

	
	/**
	 * Transform a array of bytes into a String representation.
	 * Each byte is represented as two character hex decimal. 
	 * 
	 * @param data a byte array
	 * @return a string representation of the byte array
	 */
    public static String toString(byte[] data) {
        String retval = "";
        for (int i = 0; i < data.length; i++) {
            int val = data[i] & 0xFF;
            String stringRep = Integer.toHexString(val);
            if (stringRep.length() < 2) {
                stringRep = "0" + stringRep;
            }
            retval += stringRep;
        }
        return retval;
    }

    /**
     * Transform a String representation of a byte array where
     * each byte is represented as two character hex decimal to a byte array
     * 
     * @param input a String representation of a byte array
     * @return the resulting byte array
     */
    public static byte[] parseString(String input) {
        input = input.replaceAll("\\s", "");
        byte[] retval = new byte[input.length() / 2];
        for (int i = 0; i < input.length() / 2; i++) {
            String pair = input.substring(2 * i, 2 * i + 2);
            retval[i] = parseHex(pair);
        }
        return retval;
    }

    public static byte[] XOR(byte[] x, byte[] y) {
        byte[] retval = new byte[x.length];
        for (int i = 0; i < x.length; i++) {
            retval[i] = (byte) (x[i] ^ y[i]);
        }
        return retval;
    }
    
    public static String toFormatedString(byte[] data) {
        String retval = "";
        for (int i = 0; i < data.length; i++) {
            int val = data[i] & 0xFF;
            String stringRep = Integer.toHexString(val);
            if (stringRep.length() < 2) {
                stringRep = "0" + stringRep;
            }
            retval += stringRep;
            if (i + 1 < data.length) {
                if ((i + 1) % 16 == 0) {
                    retval += "\n";
                } else if ((i + 1) % 4 == 0) {
                    retval += " ";
                }
            }
        }
        return retval;
    }
    
    public static byte parseHex(String hex) {
        int parsedInt = Integer.decode("0x" + hex);
        if (parsedInt <= Byte.MAX_VALUE && parsedInt >= 0) {
            return (byte) parsedInt;
        }
        if (parsedInt > Byte.MAX_VALUE && parsedInt <= 0xFF) {
            return (byte) (0xFFFFFF00 | parsedInt);
        }
        throw new NumberFormatException();
    }
}
