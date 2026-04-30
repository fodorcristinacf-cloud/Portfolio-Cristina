const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 35, 210)}ms`);
    observer.observe(item);
  });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const toolAreaButtons = document.querySelectorAll("[data-tool-area]");
const toolCards = document.querySelectorAll(".tools-grid article[data-category]");

if (toolAreaButtons.length && toolCards.length) {
  const setActiveToolArea = (activeButton) => {
    toolAreaButtons.forEach((button) => {
      button.classList.toggle("is-active", button === activeButton);
    });
  };

  const filterToolsByArea = (area) => {
    toolCards.forEach((card) => {
      card.classList.toggle("is-tool-hidden", card.dataset.category !== area);
    });
  };

  const focusToolCard = (card) => {
    toolCards.forEach((item) => item.classList.remove("is-tool-focus"));
    card.classList.add("is-tool-focus");
    window.setTimeout(() => {
      card.classList.remove("is-tool-focus");
    }, 1600);
  };

  toolAreaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.toolTarget;
      const area = button.dataset.toolArea;
      const targetCard =
        (targetId ? document.getElementById(targetId) : null) ||
        Array.from(toolCards).find((card) => card.dataset.category === area);

      setActiveToolArea(button);
      filterToolsByArea(area);

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        focusToolCard(targetCard);
      }
    });
  });

  const initialButton = document.querySelector("[data-tool-area].is-active") || toolAreaButtons[0];
  if (initialButton) {
    filterToolsByArea(initialButton.dataset.toolArea);
  }
}

const assistantWidget = document.querySelector("[data-assistant-widget]");
const assistantPanel = document.querySelector("[data-assistant-panel]");
const assistantToggle = document.querySelector("[data-assistant-toggle]");
const assistantMobileTrigger = document.querySelector("[data-assistant-mobile-trigger]");
const assistantMessages = document.querySelector("[data-assistant-messages]");
const assistantForm = document.querySelector("[data-assistant-form]");
const assistantResponseDelay = 650;

const knowledge = [
  {
    test: /quien|quién|cristina|sobre mi|sobre mí|perfil/i,
    answer:
      "Cristina Boroc Fodor se está especializando en IA aplicada, automatización y soluciones digitales para pequeños negocios. Combina atención al cliente, gestión, comunicación y herramientas digitales para crear recursos claros y prácticos.",
  },
  {
    test: /proyectos|trabajos|portfolio|portafolio|gpt|avatar|celador|its lava|serina|serinawear|ecommerce/i,
    answer:
      "Sus proyectos principales son: un GPT para ideas de contenido, un avatar digital con IA, el Chatbot Celador IA, una demo de asistente virtual para ITS LAVA y SerinaWear, su proyecto ecommerce propio de bolsos.",
  },
  {
    test: /herramientas|usa|utiliza|habilidades|tecnolog/i,
    answer:
      "Trabaja con ChatGPT, Copilot, Gemini, Claude, Make, Metricool, Notion, Google Workspace, Microsoft Office, Python, SEO, Content Marketing y diseño conversacional.",
  },
  {
    test: /ayuda|puede ayudar|servicios|hace|negocio|pyme/i,
    answer:
      "Puede ayudar con asistentes virtuales, chatbots, automatizaciones con Make, contenido con IA, organización digital, SEO aplicado y mejora de la atención al cliente.",
  },
  {
    test: /experiencia|trayectoria|formacion|formación|certificado|certificaciones/i,
    answer:
      "Su trayectoria conecta atención al cliente, gestión de tareas, trabajo en equipo, ecommerce propio, marketing digital, Business Intelligence, Python, Make, Copilot, SEO y Content Marketing.",
  },
  {
    test: /contacto|correo|email|linkedin|escribir/i,
    answer:
      "Puedes contactar con Cristina en fodorcristinacf@gmail.com o desde su LinkedIn: linkedin.com/in/cristina-boroc-fodor-b8a985159/",
  },
];

function appendAssistantMessage(text, role) {
  if (!assistantMessages) {
    return;
  }

  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.textContent = text;
  assistantMessages.appendChild(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function getAssistantReply(input) {
  const cleanInput = input.trim();

  if (!cleanInput) {
    return "Puedes preguntarme por Cristina, sus proyectos, habilidades, certificaciones, trayectoria o contacto.";
  }

  const match = knowledge.find((item) => item.test.test(cleanInput));

  if (match) {
    return match.answer;
  }

  return "Puedo ayudarte con información sobre Cristina, sus proyectos de IA aplicada, herramientas, certificaciones, trayectoria y forma de contacto.";
}

if (assistantWidget && assistantPanel && assistantMessages) {
  assistantWidget.classList.add("is-collapsed");
  let assistantHasGreeted = false;

  const greetAssistant = () => {
    if (assistantHasGreeted) {
      return;
    }

    appendAssistantMessage("¿En qué puedo ayudarte?", "bot");
    assistantHasGreeted = true;
  };

  const setAssistantExpanded = (expanded) => {
    assistantMobileTrigger?.setAttribute("aria-expanded", String(expanded));
  };

  const toggleAssistant = () => {
    const collapsed = assistantWidget.classList.toggle("is-collapsed");
    setAssistantExpanded(!collapsed);

    if (!collapsed) {
      greetAssistant();
    }
  };

  assistantToggle?.addEventListener("click", toggleAssistant);
  assistantMobileTrigger?.addEventListener("click", () => {
    assistantWidget.classList.remove("is-collapsed");
    setAssistantExpanded(true);
    greetAssistant();
  });

  assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = assistantForm.elements.message;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    const value = input.value.trim();

    if (!value) {
      return;
    }

    appendAssistantMessage(value, "user");
    input.value = "";

    window.setTimeout(() => {
      appendAssistantMessage(getAssistantReply(value), "bot");
    }, assistantResponseDelay);
  });

  document.querySelectorAll("[data-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent?.trim() ?? "";

      if (!value) {
        return;
      }

      appendAssistantMessage(value, "user");
      window.setTimeout(() => {
        appendAssistantMessage(getAssistantReply(value), "bot");
      }, assistantResponseDelay);
    });
  });
}
