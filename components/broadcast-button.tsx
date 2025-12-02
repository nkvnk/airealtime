import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/translations-context";

interface BroadcastButtonProps {
  isSessionActive: boolean;
  onClick: () => void;
}

export function BroadcastButton({
  isSessionActive,
  onClick,
}: BroadcastButtonProps) {
  const { t } = useTranslations();
  return (
    <Button
      variant={isSessionActive ? "outline" : "default"}
      className="w-full py-3 text-sm font-medium flex items-center justify-center gap-2 rounded-full"
      onClick={onClick}
    >
      {isSessionActive && (
        <Badge
          variant="secondary"
          className="bg-emerald-100 text-emerald-700 border border-emerald-300"
        >
          {t("broadcast.live")}
        </Badge>
      )}
      {isSessionActive ? t("broadcast.end") : t("broadcast.start")}
    </Button>
  );
}
