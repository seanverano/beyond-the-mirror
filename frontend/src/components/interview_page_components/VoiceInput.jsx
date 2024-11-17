import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send } from "lucide-react";

const VoiceInput = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  transcribedText,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <Card className="bg-[#FCF9F4]">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <Button
            className={`rounded-full p-8 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#5F4B3A] hover:bg-[#4A3829]"
            }`}
            onClick={isRecording ? onStopRecording : onStartRecording}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          <p className="font-jakarta text-center">
            {isRecording
              ? "Recording in progress... Click to stop"
              : "Click to start recording"}
          </p>
          {transcribedText && (
            <div className="w-full space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-jakarta font-semibold mb-2">
                  Transcribed Text:
                </h3>
                <p>{transcribedText}</p>
              </div>
              <Button
                className="w-full bg-[#5F4B3A] hover:bg-[#4A3829]"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Answer
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInput;
