import { Button } from "@/components/ui/button";
import Transcriber from "@/components/ui/transcriber";
import { Conversation } from "@/lib/conversations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Message as MessageType } from "@/types";
import { useTranslations } from "@/components/translations-context";

export function MessageControls({
  conversation,
}: {
  conversation: Conversation[];
  msgs: MessageType[];
}) {
  const { t } = useTranslations();

  if (conversation.length === 0) return null;

  return (
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            {t("messageControls.view")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl w-[95vw] h-[80vh] p-4 mx-auto overflow-hidden">
          <DialogHeader className="px-0 pt-0 pb-2">
            <DialogTitle>{t("messageControls.logs")}</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(100%-2.5rem)]">
            <Transcriber conversation={conversation} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
