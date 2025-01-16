// 卡牌名称和描述的映射
const cardDescriptions = {
  "元宝": "祝你新的一年里财运亨通，如元宝般闪耀，金银满仓，生活富足无忧。",
  "钱袋": "愿你在新的一年里钱袋鼓鼓，每一日都充满着财富的喜悦，收获满满，诸事顺遂。",
  "葫芦": "祈愿你在新岁之际，像葫芦一样，福禄双全，健康长寿，平安如意。",
  "富强": "祝福祖国繁荣昌盛，愿你在新的一年里共享国家富强之福，生活更加美好。",
  "民主": "期望新的一年里，人人都能体验到民主的力量，平等自由，心情舒畅，事事顺心。",
  "文明": "祈盼新的一年里，我们共同以文明之态，展现优雅风度，世界更加美好，你我皆得吉祥。",
  "和谐": "祝福您和家人在新的一年里，家庭和睦，邻里和谐，生活中充满温馨与快乐。",
  "爱国": "希望你在新的一年里，将爱国之心化作前进的力量，事事顺利，为国家增光添彩。",
  "敬业": "愿你新的一年里，敬业精神带给你更多的成就，事业蒸蒸日上，步步高升。",
  "诚信": "愿你秉持诚信之道，在新的一年里，赢得他人的信任，朋友满天下，福泽深厚。",
  "友善": "在新的一年里，愿你友善待人，广结善缘，所遇皆良人，事事顺遂，吉祥如意。",
  "红包": "愿你在新春佳节，收到的红包像雪花般飞来，带来无尽的喜气和好运，幸福满溢。",
  "春联": "祝你新的一年，贴上春联，岁岁平安，祥光满户，福气临门，诸事胜意。",
  "鞭炮": "新岁之际，鞭炮声声，愿你除旧迎新，烦恼全消，开启幸福美好的新征程。",
  "灯笼": "新的一年里，愿你如灯笼般闪耀，照亮人生道路，光明无限，好运连连。",
  "烟花": "烟花璀璨，照亮夜空，祝你新的一年里，梦想绽放，幸福永驻，吉祥如意。",
  "福字": "新春到，福字贴，愿你新的一年里，福运连绵，福星高照，阖家幸福。",
  "年糕": "祝你新的一年里，吃了年糕，生活甜蜜，事业高升，如年糕般步步高升，诸事顺遂。",
  "糖果": "愿你在新的一年里，像糖果一样甜蜜，每天都有好心情，笑口常开，幸福满溢。",
  "饺子": "新春佳节吃饺子，愿你在新的一年里，团圆美满，和和美美，健康长寿。",
  "舞狮": "新岁舞狮，愿你充满活力，龙精虎猛，新的一年里，事事顺遂，鸿运当头。",
  "金桔": "金桔满枝，新的一年里，祝你吉祥如意，大吉大利，福泽深厚，好运连连。",
  "糖葫芦": "愿你新的一年里，生活像糖葫芦一样，甜蜜多彩，幸福满串，诸事顺心。"
};

// 不同稀有度的总概率
const rarityProbabilities = {
  SSR: 0.05,
  SR: 0.10,
  R: 0.35,
  N: 0.5
};

// 同稀有度的卡牌概率分布
const ssrCardProbabilities = [0.5, 1, 1];
const srCardProbabilities = [0.5, 1, 1, 1, 1, 1, 1, 1];
const rCardProbabilities = [1, 1, 1, 1, 1, 1];
const nCardProbabilities = [1, 1, 1, 1, 1, 1];

window.cards = [
  // SSR 卡
  { name: "元宝", image: "cards/ssr1.png", probability: ssrCardProbabilities[0] * rarityProbabilities.SSR, description: cardDescriptions["元宝"], rarity: "SSR", value: 888 },
  { name: "钱袋", image: "cards/ssr2.png", probability: ssrCardProbabilities[1] * rarityProbabilities.SSR, description: cardDescriptions["钱袋"], rarity: "SSR", value: 500 },
  { name: "葫芦", image: "cards/ssr3.png", probability: ssrCardProbabilities[2] * rarityProbabilities.SSR, description: cardDescriptions["葫芦"], rarity: "SSR", value: 500 },
  // SR 卡
  { name: "富强", image: "cards/sr1.png", probability: srCardProbabilities[0] * rarityProbabilities.SR, description: cardDescriptions["富强"], rarity: "SR", value: 600 },
  { name: "民主", image: "cards/sr2.png", probability: srCardProbabilities[1] * rarityProbabilities.SR, description: cardDescriptions["民主"], rarity: "SR", value: 200 },
  { name: "文明", image: "cards/sr3.png", probability: srCardProbabilities[2] * rarityProbabilities.SR, description: cardDescriptions["文明"], rarity: "SR", value: 200 },
  { name: "和谐", image: "cards/sr4.png", probability: srCardProbabilities[3] * rarityProbabilities.SR, description: cardDescriptions["和谐"], rarity: "SR", value: 200 },
  { name: "爱国", image: "cards/sr5.png", probability: srCardProbabilities[4] * rarityProbabilities.SR, description: cardDescriptions["爱国"], rarity: "SR", value: 200 },
  { name: "敬业", image: "cards/sr6.png", probability: srCardProbabilities[5] * rarityProbabilities.SR, description: cardDescriptions["敬业"], rarity: "SR", value: 200 },
  { name: "诚信", image: "cards/sr7.png", probability: srCardProbabilities[6] * rarityProbabilities.SR, description: cardDescriptions["诚信"], rarity: "SR", value: 200 },
  { name: "友善", image: "cards/sr8.png", probability: srCardProbabilities[7] * rarityProbabilities.SR, description: cardDescriptions["友善"], rarity: "SR", value: 200 },
  // R 卡
  { name: "红包", image: "cards/r1.png", probability: rCardProbabilities[0] * rarityProbabilities.R, description: cardDescriptions["红包"], rarity: "R", value: 50 },
  { name: "春联", image: "cards/r2.png", probability: rCardProbabilities[1] * rarityProbabilities.R, description: cardDescriptions["春联"], rarity: "R", value: 50 },
  { name: "鞭炮", image: "cards/r3.png", probability: rCardProbabilities[2] * rarityProbabilities.R, description: cardDescriptions["鞭炮"], rarity: "R", value: 50 },
  { name: "灯笼", image: "cards/r4.png", probability: rCardProbabilities[3] * rarityProbabilities.R, description: cardDescriptions["灯笼"], rarity: "R", value: 50 },
  { name: "烟花", image: "cards/r5.png", probability: rCardProbabilities[4] * rarityProbabilities.R, description: cardDescriptions["烟花"], rarity: "R", value: 50 },
  { name: "福字", image: "cards/r6.png", probability: rCardProbabilities[5] * rarityProbabilities.R, description: cardDescriptions["福字"], rarity: "R", value: 50 },
  // N 卡
  { name: "年糕", image: "cards/n1.png", probability: nCardProbabilities[0] * rarityProbabilities.N, description: cardDescriptions["年糕"], rarity: "N", value: 10 },
  { name: "糖果", image: "cards/n2.png", probability: nCardProbabilities[1] * rarityProbabilities.N, description: cardDescriptions["糖果"], rarity: "N", value: 10 },
  { name: "饺子", image: "cards/n3.png", probability: nCardProbabilities[2] * rarityProbabilities.N, description: cardDescriptions["饺子"], rarity: "N", value: 10 },
  { name: "舞狮", image: "cards/n4.png", probability: nCardProbabilities[3] * rarityProbabilities.N, description: cardDescriptions["舞狮"], rarity: "N", value: 10 },
  { name: "金桔", image: "cards/n5.png", probability: nCardProbabilities[4] * rarityProbabilities.N, description: cardDescriptions["金桔"], rarity: "N", value: 10 },
  { name: "糖葫芦", image: "cards/n6.png", probability: nCardProbabilities[5] * rarityProbabilities.N, value: 10, description: cardDescriptions["糖葫芦"], rarity: "N" }
];