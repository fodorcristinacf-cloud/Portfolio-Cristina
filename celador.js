if (document.body.classList.contains("project-page")) {
  (function () {
    if (window.chatbase && window.chatbase("getState") === "initialized") {
      return;
    }

    window.chatbase =
      window.chatbase ||
      function (...args) {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

    window.chatbase = new Proxy(window.chatbase, {
      get(target, prop) {
        if (prop === "q") {
          return target.q;
        }

        return (...args) => target(prop, ...args);
      },
    });

    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "jwLBAP-sUUJki8edJtyla";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
  })();
}

const celadorChatOpen = document.querySelector("[data-celador-chat-open]");
const celadorChatCallout = document.querySelector(".celador-chat-callout");
const celadorChatMinimize = document.querySelector("[data-celador-chat-minimize]");

if (celadorChatOpen) {
  celadorChatOpen.addEventListener("click", () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  });
}

if (celadorChatCallout && celadorChatMinimize) {
  celadorChatMinimize.addEventListener("click", () => {
    const isMinimized = celadorChatCallout.classList.toggle("is-minimized");
    celadorChatMinimize.setAttribute("aria-expanded", String(!isMinimized));
    celadorChatMinimize.setAttribute(
      "aria-label",
      isMinimized ? "Desplegar aviso del chat" : "Minimizar aviso del chat",
    );
  });
}
