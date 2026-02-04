# AI Archive Context Documents

This folder contains context documents for the AI Archive feature. These documents provide the RAG (Retrieval-Augmented Generation) knowledge base for the conversational AI.

---

## Document Sources

| Dish | Source | File |
|------|--------|------|
| 松鼠桂鱼 | Interview transcript | `/docs/interview_transcript.md` |
| 响油鳝糊 | Interview transcript | `/docs/interview_transcript.md` |
| 荷塘小炒 | Interview transcript | `/docs/interview_transcript.md` |
| 清炒虾仁 | Interview transcript | `/docs/interview_transcript.md` |
| 金牌酱油虾 (Golden Soy Sauce Shrimp) | Dianping reviews | `golden-soy-shrimp.md` |
| 白什锦 (Assorted Delicacies in Clear Broth) | Dianping reviews | `assorted-delicacies.md` |
| 蟹粉豆腐 (Tofu with Crab Roe) | Dianping reviews | `crab-roe-tofu.md` |
| 椒盐排条 (Salt and Pepper Pork Strips) | Dianping reviews | `salt-pepper-pork.md` |
| 糟溜黑鱼片 (Wine Lees Sliced Snakehead Fish) | Dianping reviews | `wine-lees-fish.md` |
| 糖醋排骨 (Sweet and Sour Pork Ribs) | Dianping reviews | `sweet-sour-ribs.md` |
| 银鱼炒蛋 (Scrambled Eggs with Whitebait) | Dianping reviews | `whitebait-eggs.md` |
| 赤豆圆子 (Sweet Red Bean Soup with Rice Balls) | Dianping reviews | `red-bean-soup.md` |

---

## Document Format

Each context document should follow this structure:

```markdown
# [菜品中文名] - [English Name]

## Overview
Brief description of the dish

## Dianping Reviews
Real customer feedback from Dianping.com

### Review 1
> "原文评价..."
— 用户名, 日期

### Review 2
...

## Culinary Notes
Any additional context about ingredients, preparation, or cultural significance
```
