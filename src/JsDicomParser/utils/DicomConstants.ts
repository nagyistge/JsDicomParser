module JsDicomParser {
    export class DicomConstants {

        public static Tags: any = {
            Modality: "x00080060",
            PixelData: "x7fe00010",
            TransferSyntaxUID: "x00020010",
            PhotometricInterpretation: "x00280004",
            PixelSpacing: "x00280030",
            Rows: "x00280010",
            Columns: "x00280011",
            BitsAllocated: "x00280100",
            BitsStored: "x00280101",
            PixelRepresentation: "x00280103",
            NumberOfFrames: "x00280008",
            StartOfItem: "xfffee000",
            EndOfItems: "xfffee00d",
            EndOfSequence: "xfffee0dd",
            DerivationDescription: "x00082111",
            SOPInstanceUID: "x00080018"
        }

        public static TransferSyntaxes: any = {
            ImplicitVrLittleEndian: "1.2.840.10008.1.2",
            ExplicitVrBigEndian: "1.2.840.10008.1.2.2"
        }
    }
}