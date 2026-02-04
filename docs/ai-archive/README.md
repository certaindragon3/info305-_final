# AI Archive Context Documents

This folder contains context documents for the AI Archive feature. These documents serve **two purposes**:
1. **Display Content**: Brief, welcome message, and suggested questions shown in the UI
2. **RAG Corpus**: Knowledge base for the conversational AI

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

## Document Format (3-Section Structure)

Each context document has **3 distinct sections**:

```markdown
# [菜品中文名] - [English Name]

---
## Section 1: Brief (简介)
<!-- 2-3 sentences describing the dish. Shown in the info card below the 3D model. -->

苏帮名菜，以精湛刀工将鳜鱼改成松鼠形，外酥里嫩，浇上酸甜卤汁。

A signature Suzhou dish featuring intricate knife work that shapes the fish 
into a squirrel form, crispy outside and tender inside, topped with sweet 
and sour sauce.

---
## Section 2: Welcome (欢迎语)
<!-- AI's opening message when user enters the chat. Should be warm and inviting. -->

欢迎来到松鼠桂鱼档案！这道菜以精湛刀工和酸甜卤汁著称，是苏帮菜的代表作。有什么想了解的？

Welcome to the Squirrel Fish archive! This dish is famous for its intricate 
knife work and sweet-sour sauce. What would you like to know?

### Suggested Questions
<!-- 2-3 clickable prompts to help users start the conversation -->
- 为什么叫松鼠鱼？ / Why is it called Squirrel Fish?
- 油温怎么判断？ / How do you judge the oil temperature?
- 活卤是什么？ / What is "living sauce"?

---
## Section 3: RAG Corpus (知识库)
<!-- All content below this line is indexed for RAG retrieval -->

### Dianping Reviews
Real customer feedback from Dianping.com

#### Review 1
> "原文评价..."
— 用户名, 日期

#### Review 2
...

### Culinary Notes
Any additional context about ingredients, preparation, or cultural significance

### Chef Interview Excerpts (if available)
Relevant quotes from interview transcript
```

---

## Key Points

1. **Brief**: Concise, bilingual, for quick scanning
2. **Welcome**: Conversational, sets the tone for AI interaction
3. **Suggested Questions**: 2-3 prompts that showcase what users can ask
4. **RAG Corpus**: Everything the AI can cite — reviews, notes, interview excerpts
