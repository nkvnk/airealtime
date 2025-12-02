import { Badge } from "@/components/ui/badge"

export const Welcome = () => {
  return (
    <div className="text-center mb-8 rounded-lg p-4 space-y-4">
      <div className="flex justify-center items-center mx-auto gap-2 h-full w-full mb-2">
        <Badge className="text-xl font-medium motion-preset-slide-left-md">
          不動産営業ロープレAI
        </Badge>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 motion-preset-slide-up-lg">
        AIのお客様と、いつでもどこでもロープレ
      </h1>
      <p className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground motion-preset-slide-down leading-relaxed">
        音声ボタンを押して会話を開始し、最初に
        <span className="font-semibold">「パターン1 × シチュエーション2」</span>
        のように伝えると、その条件のお客様役がロープレを始めます。
        ロープレが終わったら
        <span className="font-semibold">「フィードバックをして」</span>
        と話すと、良かった点と改善点を教えてくれます。
      </p>
    </div>
  )
} 

export default Welcome;