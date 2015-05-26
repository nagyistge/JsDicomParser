/// <reference path="./../typing/browserify.d.ts" />
/// <reference path="./IDicomReader.ts" />
/// <reference path="./../DicomElement.ts" />
/// <reference path="./../DicomTag.ts" />
/// <reference path="./../utils/DicomConstants.ts" />

class ExplicitDicomReader implements IDicomReader {

    readTag(stream: ByteStream):DicomTag {

        if(stream === undefined)
        {
            throw "ExplicitDicomReader.readTag: stream can't be undefined";
        }

        var tag = new DicomTag();
        tag.group = stream.readUint16();
        tag.element = stream.readUint16();

        return tag;
    }

    readElement(stream: ByteStream): DicomElement {
        if(stream === undefined)
        {
            throw "ExplicitDicomReader.readTag: stream can't be undefined";
        }

        var element = new DicomElement();
        
        var tag: DicomTag = this.readTag(stream);
        element.tag = tag.getCode();
        element.tagName = tag.findName();
        element.tagSearchCode = tag.getDicomLookupSearchCode();

        element.vr = stream.readFixedString(2);

        var dataLengthSizeBytes = this._getDataLengthSizeInBytesForVR(element.vr);
        if(dataLengthSizeBytes === 2)
        {
            element.length = stream.readUint16();
            element.offset = stream.position;
        }
        else
        {
            stream.seek(2);
            element.length = stream.readUint32();
            element.offset = stream.position;
        }

        if(element.length === 4294967295)
        {
            element.isUndefinedLength = true;

            if(element.tag === DicomConstants.Tags.PixelData) {

                // find image pixels size
                
                return element;
            } else {

                // find item delimitation 

                return element;
            }            
        }

        if(element.vr === 'SQ') {
            // read the sequence
        }
        
        stream.seek(element.length);
        
        return element;
    }

    _getDataLengthSizeInBytesForVR(vr)
    {
        if( vr === 'OB' ||
            vr === 'OW' ||
            vr === 'SQ' ||
            vr === 'OF' ||
            vr === 'UT' ||
            vr === 'UN')
        {
            return 4;
        }
        else
        {
            return 2;
        }
    }
}