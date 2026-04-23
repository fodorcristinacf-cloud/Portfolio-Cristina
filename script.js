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
      threshold: 0.16,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 40, 220)}ms`);
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

const assistantWidget = document.querySelector("[data-assistant-widget]");
const assistantPanel = document.querySelector("[data-assistant-panel]");
const assistantToggle = document.querySelector("[data-assistant-toggle]");
const assistantMobileTrigger = document.querySelector("[data-assistant-mobile-trigger]");
const assistantMessages = document.querySelector("[data-assistant-messages]");
const assistantForm = document.querySelector("[data-assistant-form]");
const assistantResponseDelay = 3000;

const knowledge = [
  {
    test: /qu[ií]en|qui[eé]n es cristina|sobre cristina|perfil/i,
    answer:
      "Cristina Boroc Fodor trabaja con IA aplicada, automatización y herramientas digitales para ayudar a mejorar procesos, presencia online y organización en proyectos y pequeños negocios.",
  },
  {
    test: /proyectos|trabajos|portfolio|portafolio/i,
    answer:
      "En el portfolio aparecen cuatro líneas principales: Mi GPT para contenido con IA, Avatar digital, Chatbot Celador IA y una demo de asistente virtual para ITS LAVA orientada a atención al cliente.",
  },
  {
    test: /its lava|itslava|atención al cliente|atencion al cliente/i,
    answer:
      "Dentro de proyectos hay una demo de asistente virtual para ITS LAVA, pensada para resolver dudas sobre pedidos, envíos, devoluciones, cambios, tiendas físicas y contacto.",
  },
  {
    test: /herramientas|usa|utiliza|tecnolog/i,
    answer:
      "Trabaja con ChatGPT, Gemini, Copilot, Claude, Make, Notion, Metricool, Google Workspace, Microsoft Office y recursos de automatización, chatbots y contenido con IA.",
  },
  {
    test: /ayuda|puede ayudar|servicios|hace/i,
    answer:
      "Puede ayudar con asistentes virtuales, automatización de procesos, contenido con IA, digitalización para pymes, presencia web y soluciones conversacionales orientadas a negocio.",
  },
  {
    test: /experiencia|trayectoria|formaci[oó]n/i,
    answer:
      "Su trayectoria combina un ecommerce propio, experiencia transferible en atención al cliente y gestión, y formación en IA aplicada, marketing digital, business intelligence, Python y habilidades digitales.",
  },
  {
    test: /contacto|correo|email|escribir/i,
    answer:
      "Puedes contactar con Cristina en fodorcristinacf@gmail.com.",
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
    return "Puedes preguntarme por Cristina, sus proyectos, herramientas, experiencia o cómo contactar.";
  }

  const match = knowledge.find((item) => item.test.test(cleanInput));

  if (match) {
    return match.answer;
  }

  return "Puedo ayudarte con información sobre Cristina, sus proyectos, las herramientas que utiliza, su experiencia y la forma de contacto.";
}

if (assistantWidget && assistantPanel && assistantMessages) {
  assistantWidget.classList.add("is-collapsed");
  let assistantHasGreeted = false;

  const greetAssistant = () => {
    if (assistantHasGreeted) {
      return;
    }

    appendAssistantMessage("\u00bfEn qu\u00e9 puedo ayudarte?", "bot");
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