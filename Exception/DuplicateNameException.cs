using System;

namespace App.CustomExceptions
{
    public class DuplicateNameException : Exception
    {
    public DuplicateNameException() : base() { }
    public DuplicateNameException(string message) : base(message) { }
    public DuplicateNameException(string message, System.Exception inner) : base(message, inner) { }

    // A constructor is needed for serialization when an
    // exception propagates from a remoting server to the client. 
    protected DuplicateNameException(System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) { }
    }
}