"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ToolsEducation() {
  return (
    <div className="w-full max-w-3xl mt-8">
      <Accordion type="single" collapsible defaultValue="howto">
        <AccordionItem value="howto">
          <AccordionTrigger>使い方ガイド（ロープレの流れ）</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">STEP 1</p>
                <h3 className="font-bold">音声を開始する</h3>
                <p className="text-muted-foreground">
                  画面中央のボタンで音声をオンにします。必要であれば、上部のプルダウンから声のタイプを選択してください。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">STEP 2</p>
                <h3 className="font-bold">パターン × シチュエーションを指定</h3>
                <p className="text-muted-foreground">
                 
                  例）<span className="font-semibold">「パターン1 × シチュエーション2でお願いします」</span>
                  と話しかけると、その条件のお客様が登場します。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">STEP 3</p>
                <h3 className="font-bold">ロープレ後にフィードバック</h3>
                <p className="text-muted-foreground">
                  ロープレを終えたいタイミングで
                  <span className="font-semibold">「フィードバックをして」</span>
                  と伝えると、良かったポイント1つと改善点3つが返ってきます。
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="patterns">
          <AccordionTrigger>パターン一覧（お客様タイプ）</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">パターン1：相続直後の高齢女性</h3>
                <p className="text-muted-foreground">
                  68歳・夫を亡くし郊外の戸建てを相続。空き家の管理に困っている、慎重で心配性なお客様です。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">パターン2：収益性重視の投資家</h3>
                <p className="text-muted-foreground">
                  45歳・都内に複数物件を保有。数字に強く、費用・利回り・市場価格など具体的な数字で判断します。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">パターン3：住み替え検討中のファミリー</h3>
                <p className="text-muted-foreground">
                  35歳・夫婦＋子供2人。学区や住環境、ローン負担を重視しつつ、前向きに戸建てを検討しています。
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="situations">
          <AccordionTrigger>シチュエーション一覧（場面設定）</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">シチュエーション1：初回のアポ取得電話</h3>
                <p className="text-muted-foreground">
                  初めての電話で、訪問アポイントを取りたい場面。お客様は時間が取れるか慎重に判断します。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">シチュエーション2：訪問査定・初回面談</h3>
                <p className="text-muted-foreground">
                  お客様宅で状況ヒアリングと査定説明を行う場面。信頼して任せられるかどうかを見られます。
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 space-y-1">
                <h3 className="font-bold">シチュエーション3：2回目訪問・クロージング</h3>
                <p className="text-muted-foreground">
                  提案内容を提示し、契約・媒介を決断してもらう場面。条件・手数料・タイミングへの質問が増えます。
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tips">
          <AccordionTrigger>おすすめの使い方</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>新人研修では「パターン1 × シチュエーション1」からスタートし、基本の電話アプローチを練習。</li>
              <li>慣れてきたら「パターン2 × シチュエーション3」で、条件交渉・クロージングのロープレを行う。</li>
              <li>1ロールプレイごとに必ず「フィードバックをして」と伝えて、改善点をメモして振り返る。</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 