
    const TOPICS = {
      ai: {
        label: "AI strategy and implementation",
        icon: "🧠",
        questions: [
          {
            mode: "single",
            question: "Welche der folgenden Antworten ist kein AI Chatbot?",
            options: ["ChatGPT", "Claude", "Gemini", "Google Search"],
            answer: "Google Search",
            explanation: "Google Search ist eine Suchmaschine und kein AI Chatbot."
          },
          {
            mode: "single",
            question: "Was ist der erste wichtige Schritt zur Einführung einer AI-Lösung im Unternehmen?",
            options: ["Kosten-Nutzen-Abschätzung", "Wahl der richtigen Technologie", "Bedarfsermittlung", "Testing verschiedener Optionen"],
            answer: "Bedarfsermittlung",
            explanation: "Zuerst sollte der konkrete Bedarf verstanden werden."
          },
          {
            mode: "single",
            question: "Was ist bei den meisten Unternehmen die größte Herausforderung für die erfolgreiche Einführung von KI?",
            options: ["Akzeptanz der Mitarbeitenden", "Strategische Einbindung der Tools", "Finden eines geeigneten Use Cases", "Auswahl der besten Technologie"],
            answer: "Strategische Einbindung der Tools",
            explanation: "Technologie allein reicht nicht — die Einbettung in die Organisation ist entscheidend."
          }
        ]
      },
      cyber: {
        label: "Cybersecurity",
        icon: "🛡️",
        questions: [
          {
            mode: "single",
            question: "Geeignete Cybersecurity Strategien ...",
            options: [
              "Eliminieren jedes Risiko von externen Angriffen",
              "Entwickeln sich stetig weiter, um sich den ändernden Bedrohungen anzupassen",
              "Werden einmal aufgesetzt und behalten dann immer ihre Gültigkeit",
              "Sind nicht für jedes Unternehmen notwendig"
            ],
            answer: "Entwickeln sich stetig weiter, um sich den ändernden Bedrohungen anzupassen",
            explanation: "Bedrohungen verändern sich — Security muss sich laufend anpassen."
          },
          {
            mode: "multi",
            question: "Cybersecurity muss sich aktuellen regulatorischen Vorgaben anpassen. Welche drei wichtigen Vorgaben sind das unter anderem? Bitte wählen Sie drei Antworten aus.",
            options: ["NIS2", "KRITIS", "DORA", "NEMO"],
            answer: ["NIS2", "KRITIS", "DORA"],
            explanation: "Korrekt sind NIS2, KRITIS und DORA."
          },
          {
            mode: "single",
            question: "TBD: Welche Aussage beschreibt einen modernen Security-Ansatz am besten?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          }
        ]
      },
      cloud: {
        label: "Cloud and Sovereignty",
        icon: "☁️",
        questions: [
          {
            mode: "single",
            question: "TBD: Welche Aussage passt am besten zu Cloud Sovereignty?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          },
          {
            mode: "single",
            question: "TBD: Was ist ein wichtiger Faktor bei der Wahl einer souveränen Cloud-Architektur?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          },
          {
            mode: "single",
            question: "TBD: Welche Maßnahme unterstützt die Kontrolle über Daten und Plattformen am stärksten?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          }
        ]
      },
      integration: {
        label: "System Integration",
        icon: "🧩",
        questions: [
          {
            mode: "single",
            question: "TBD: Was ist ein typischer Vorteil einer guten Systemintegration?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          },
          {
            mode: "single",
            question: "TBD: Welche Aussage beschreibt Integrationsarchitektur am besten?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          },
          {
            mode: "single",
            question: "TBD: Was reduziert sich durch saubere Schnittstellen häufig am stärksten?",
            options: ["TBD", "TBD", "TBD", "TBD"],
            answer: "TBD",
            explanation: "Platzhalterfrage für den finalen Inhalt."
          }
        ]
      }
    };

    const topicList = document.getElementById("topicList");
    const progressLabel = document.getElementById("progressLabel");
    const progressCount = document.getElementById("progressCount");
    const progressBar = document.getElementById("progressBar");
    const questionTitle = document.getElementById("questionTitle");
    const questionSubtitle = document.getElementById("questionSubtitle");
    const answers = document.getElementById("answers");
    const hint = document.getElementById("hint");
    const topicBanner = document.getElementById("topicBanner");
    const nextButton = document.getElementById("nextButton");
    const contentCard = document.getElementById("contentCard");
    const winCard = document.getElementById("winCard");
    const logoC = document.getElementById("logoC");
    const logoG = document.getElementById("logoG");
    const logoI = document.getElementById("logoI");

    let selectedTopicKey = null;
    let currentIndex = 0;
    let correctCount = 0;
    let selectedSingle = "";
    let selectedMulti = new Set();
    let locked = false;
    let answerState = null; // correct | incorrect | null
    let shuffledOptions = [];
    let confettiTimeout = null;

    function renderTopicButtons() {
      topicList.innerHTML = "";
      Object.entries(TOPICS).forEach(([key, topic]) => {
        const btn = document.createElement("button");
        btn.className = "topic-btn" + (key === selectedTopicKey ? " active" : "");
        btn.type = "button";
        btn.innerHTML = `
          <span class="topic-icon" aria-hidden="true">${topic.icon}</span>
          <span class="topic-text">${topic.label}</span>
          <span class="topic-arrow" aria-hidden="true">›</span>
        `;
        btn.addEventListener("click", () => selectTopic(key));
        topicList.appendChild(btn);
      });
    }

    function setLogoState() {
      logoC.classList.toggle("visible", correctCount >= 1);
      logoG.classList.toggle("visible", correctCount >= 2);
      logoI.classList.toggle("visible", correctCount >= 3);
    }

    function updateProgress() {
      progressLabel.textContent = `Frage ${Math.min(currentIndex + 1, 3)} von 3`;
      progressCount.textContent = `${correctCount} / 3 richtig`;
      progressBar.style.width = `${(correctCount / 3) * 100}%`;
      setLogoState();
    }

    function currentTopic() {
      return selectedTopicKey ? TOPICS[selectedTopicKey] : null;
    }

    function currentQuestion() {
      const topic = currentTopic();
      return topic ? topic.questions[currentIndex] : null;
    }

    function shuffleArray(values) {
      const arr = [...values];
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function prepareQuestionOptions() {
      const q = currentQuestion();
      shuffledOptions = q ? shuffleArray(q.options) : [];
    }

    function renderQuestions() {
      const topic = currentTopic();
      if (!topic) {
        topicBanner.textContent = "Bitte wähle zuerst ein Thema.";
        questionTitle.textContent = "Wähle ein Thema links, um zu starten.";
        questionSubtitle.textContent = "Die drei Fragen passen sich dem gewählten Themenfeld an.";
        answers.innerHTML = "";
        hint.innerHTML = '<span class="dot"></span><span>Das Gewinnspiel wird erst nach 3 korrekten Antworten freigeschaltet.</span>';
        nextButton.classList.add("hide");
        return;
      }

      if (correctCount >= 3) {
        contentCard.classList.add("hide");
        winCard.classList.remove("hide");
        const confettiLayer = document.getElementById('confettiLayer');
        if (confettiLayer) confettiLayer.classList.remove('hide');
        progressLabel.textContent = "Gewinnspiel freigeschaltet";
        progressCount.textContent = "3 / 3 richtig";
        progressBar.style.width = "100%";
        setLogoState();
        return;
      }

      contentCard.classList.remove("hide");
      winCard.classList.add("hide");

      const q = currentQuestion();
      if (!q) return;
      if (!shuffledOptions.length || shuffledOptions.length !== q.options.length) prepareQuestionOptions();
      topicBanner.textContent = topic.label;
      questionTitle.textContent = `${currentIndex + 1}. ${q.question}`;
      questionSubtitle.textContent = topic.questions.length === 3
        ? "Beantworte die Fragen deines gewählten Themenfelds."
        : "Wähle eine Antwort oder mehrere Antworten, wenn es eine Mehrfachauswahl ist.";

      renderAnswers();
      updateHint(q);
      nextButton.classList.toggle("hide", true);
      updateProgress();
    }

    function updateHint(question) {
      if (answerState === "correct") {
        hint.innerHTML = `<span class="dot" style="background: var(--green)"></span><span><strong>Richtig!</strong> ${question.explanation}</span>`;
      } else if (answerState === "incorrect") {
        hint.innerHTML = `<span class="dot" style="background: var(--red)"></span><span>Noch nicht ganz. Bitte prüfe deine Auswahl.</span>`;
      } else {
        hint.innerHTML = `<span class="dot"></span><span>${question.mode === "multi" ? "Bei dieser Frage müssen alle richtigen Optionen gewählt werden." : "Wähle eine Antwort aus und prüfe sie anschließend."}</span>`;
      }
    }

    function renderAnswers() {
      const q = currentQuestion();
      answers.innerHTML = "";

      if (!q) return;

      if (q.mode === "single") {
        shuffledOptions.forEach((opt) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "answer" + (selectedSingle === opt ? " selected" : "");
          if (answerState === "correct" && opt === q.answer) btn.classList.add("correct");
          if (answerState === "incorrect" && selectedSingle === opt && opt !== q.answer) btn.classList.add("incorrect");
          btn.innerHTML = `<span class="radio" aria-hidden="true"></span><span class="text">${opt}</span>`;
          btn.addEventListener("click", () => {
            if (locked) return;
            selectedSingle = opt;
            answerState = null;
            renderQuestions();
          });
          answers.appendChild(btn);
        });
      } else {
        shuffledOptions.forEach((opt) => {
          const checked = selectedMulti.has(opt);
          const label = document.createElement("button");
          label.type = "button";
          label.className = "answer" + (checked ? " selected" : "");
          label.innerHTML = `<span class="radio" aria-hidden="true"></span><span class="text">${opt}</span>`;
          label.addEventListener("click", () => {
            if (locked) return;
            if (selectedMulti.has(opt)) selectedMulti.delete(opt);
            else selectedMulti.add(opt);
            answerState = null;
            renderQuestions();
          });
          answers.appendChild(label);
        });
      }
    }

    function checkAnswer() {
      const q = currentQuestion();
      if (!q || locked) return;

      let correct = false;
      if (q.mode === "single") {
        correct = selectedSingle === q.answer;
      } else {
        const arr = Array.from(selectedMulti).sort();
        const answer = [...q.answer].sort();
        correct = arr.length === answer.length && arr.every((v, i) => v === answer[i]);
      }

      if (correct) {
        locked = true;
        answerState = "correct";
        updateHint(q);
        renderAnswers();

        setTimeout(() => {
          correctCount += 1;
          selectedSingle = "";
          selectedMulti = new Set();
          locked = false;
          answerState = null;

          if (correctCount >= 3) {
            if (confettiTimeout) window.clearTimeout(confettiTimeout);
            const layer = document.getElementById('confettiLayer');
            if (layer) {
              const colors = ['#e31937', '#5236ab', '#f5f7ff', '#ff6a00'];
              const pieces = Array.from({ length: 42 }, (_, idx) => {
                const piece = document.createElement('span');
                const size = 8 + Math.floor(Math.random() * 8);
                const drift = Math.floor(Math.random() * 220) - 110;
                const spin = (360 + Math.floor(Math.random() * 720)) * (Math.random() > 0.5 ? 1 : -1);
                piece.className = 'confetti-piece ' + (idx % 3 === 0 ? 'square' : 'slim');
                piece.style.setProperty('--left', `${Math.random() * 100}%`);
                piece.style.setProperty('--delay', `${Math.floor(Math.random() * 650)}ms`);
                piece.style.setProperty('--duration', `${1800 + Math.floor(Math.random() * 900)}ms`);
                piece.style.setProperty('--size', `${size}px`);
                piece.style.setProperty('--drift', `${drift}px`);
                piece.style.setProperty('--spin', `${spin}deg`);
                piece.style.setProperty('--piece-color', colors[idx % colors.length]);
                layer.appendChild(piece);
                return piece;
              });
              layer.classList.remove('hide');
              confettiTimeout = window.setTimeout(() => {
                pieces.forEach((el) => el.remove());
                layer.classList.add('hide');
              }, 2600);
            }
            renderQuestions();
            return;
          }
          currentIndex += 1;
          prepareQuestionOptions();
          updateProgress();
          renderQuestions();
        }, 900);
      } else {
        answerState = "incorrect";
        updateHint(q);
        renderAnswers();
      }
    }

    function selectTopic(key) {
      selectedTopicKey = key;
      currentIndex = 0;
      correctCount = 0;
      selectedSingle = "";
      selectedMulti = new Set();
      locked = false;
      answerState = null;

      contentCard.classList.remove("hide");
      winCard.classList.add("hide");
      topicBanner.textContent = TOPICS[key].label;
      nextButton.classList.add("hide");
      prepareQuestionOptions();
      updateProgress();
      renderTopicButtons();
      renderQuestions();
    }

    const checkButton = document.createElement("button");
    checkButton.className = "primary";
    checkButton.type = "button";
    checkButton.textContent = "Antwort prüfen";
    checkButton.addEventListener("click", checkAnswer);
    document.querySelector(".controls").prepend(checkButton);

    nextButton.textContent = "Weiter";

    renderTopicButtons();
    renderQuestions();
    updateProgress();
    setLogoState();
  