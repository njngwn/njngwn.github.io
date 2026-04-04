---
layout: post
title: Machine Learning
date: 2026-04-04 20:52 +0200
categories: [Computer Science, Machine Learning]
tags: [machine-learning, computer-science]
mermaid: true
---

# Machine Learning

```mermaid
graph TD
    %% 1단계: 입력 데이터 (Input)
    subgraph Input_Layer [Input]
        I1[Data with Labels]
        I2[Data without Labels]
        I3[States and Actions]
    end

    %% 2단계: 학습 방법 (Learning Methods) 및 피드백
    subgraph Learning_Process [Learning]
        SL[Supervised Learning]
        UL[Unsupervised Learning]
        RL[Reinforcement Learning]
        
        %% 피드백 루프
        SL -.->|Error| SL
        RL -.->|Reward| RL
    end

    %% 3단계: 결과물 (Output)
    subgraph Output_Layer [Output]
        O1[Mapping]
        O2[Classes]
        O3[Action]
    end

    %% 4단계: 상세 분류 및 알고리즘 (Detailed Algorithms)
    subgraph SL_Details [Supervised Algorithms]
        O1 --> Reg[Regression]
        O1 --> Class[Classification]
        
        Reg --> Reg_L[Linear Regression]
        Reg --> Reg_P[Poisson Regression]
        Reg --> Reg_E[Ensemble Methods]
        Reg --> Reg_PCR[PCR Regression]
        Reg --> Reg_LS[Lasso]
        Reg --> Reg_NN[Neural Networks]
        
        Class --> Class_L[Logistic Regression]
        Class --> Class_NB[Naive Bayes]
        Class --> Class_DT[Decision Trees]
        Class --> Class_E[Ensemble Methods]
        Class --> Class_NN[Neural Networks]
    end

    subgraph UL_Details [Unsupervised Algorithms]
        O2 --> Clust[Clustering]
        O2 --> DimRed[Dimensionality Reduction]
        
        Clust --> C_KM[k-Means]
        Clust --> C_MST[MST]
        Clust --> C_EM[Expectation Maximization]
        
        DimRed --> DR_P[PCR]
        DimRed --> DR_S[SVD]
    end

    subgraph RL_Details [Reinforcement Algorithms]
        O3 --> RL_MB[Model-based]
        O3 --> RL_MF[Model-free]
    end

    %% 전체 연결
    I1 --> SL
    I2 --> UL
    I3 --> RL
    
    SL --> O1
    UL --> O2
    RL --> O3
```