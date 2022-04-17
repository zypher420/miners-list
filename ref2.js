var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
 
GetParams();

function GetParams()
{
  var defs = document.getElementsByTagName( "defs" )[0];

  var refs = [];
  var refList = defs.getElementsByTagName( "ref" );

  for ( var r = refList.length -1; 0 <= r; r-- )
  {
    var eachRef = refList.item( r );
    var id = eachRef.getAttribute( "id" );
    var paramName = eachRef.getAttribute( "param" );
    var defaultVal = eachRef.getAttribute( "default" );
    if (!defaultVal)
    {
      if (eachRef.firstChild)
      {
	    defaultVal = eachRef.firstChild.nodeValue;
      }
      else
      {
	    defaultVal = "";
      }
    }

    refs[ paramName ] = [eachRef, id, defaultVal];
  }

  var paramArray = [];

  var href = document.defaultView.location.href;
  if ( -1 != href.indexOf("?") )
  {
    var paramList = href.split("?")[1].split(/&|;/);
    for ( var p = 0, pLen = paramList.length; pLen > p; p++ )
    {
       var eachParam = paramList[ p ];
       var valList = eachParam.split("=");
       var name = unescape(valList[0]);
       var value = unescape(valList[1]);

       refs[ name ][2] = value;
     }
  }

  if ( document.defaultView.frameElement )
  {
     var params = document.defaultView.frameElement.getElementsByTagName("param");

     for ( var i = 0, iLen = params.length; iLen > i; i++ )
     {
        var eachParam = params[ i ];
        var name = eachParam.getAttribute( "name" );
        var value = eachParam.getAttribute( "value" );
        
        refs[ name ][2] = value;
     }
  }

  for ( paramName in refs )
  {
    var eachParam = refs[ paramName ];
	GetIdRefs( eachParam[1], eachParam[2] );
  }

}


function GetIdRefs( id, val )
{
  var elList = document.documentElement.getElementsByTagName( "*" );
  for ( var i = 0, iLen = elList.length; iLen > i; i++ )
  {
    var eachEl = elList.item( i );
    for ( var a = 0, aLen = eachEl.attributes.length; aLen > a; a++ )
    {
	  var attr = eachEl.attributes[ a ];
	  if ( attr && -1 != attr.value.indexOf("#" + id) )
	  {
        if ( "tref" == eachEl.localName )
        {
		  var t = document.createTextNode( val );
		  eachEl.parentNode.replaceChild( t, eachEl );
	    }
	    else
	    {
		  eachEl.setAttributeNS( attr.namespaceURI, attr.name, val);
		}
	  }
	}
  }
}
