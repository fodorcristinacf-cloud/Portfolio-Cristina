const itsLavaMessages = document.querySelector("[data-itslava-messages]");
const itsLavaForm = document.querySelector("[data-itslava-form]");

function appendItsLavaMessage(text, role) {
  if (!itsLavaMessages) {
    return;
  }

  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.textContent = text;
  itsLavaMessages.appendChild(message);
  itsLavaMessages.scrollTop = itsLavaMessages.scrollHeight;
}

function replyItsLava(input) {
  const text = input.trim().toLowerCase();

  if (!text) {
    return "Hola, soy el asistente virtual oficial de ITS LAVA. ¿En qué puedo ayudarte?";
  }

  const askHuman =
    /defect|mal funcionamiento|reembolso|queja|reclam|mala experiencia|incidencia compleja|problema serio/.test(
      text,
    );

  if (askHuman) {
    return "Para esta consulta es mejor que contactes directamente con el equipo de ITS LAVA en hola@itslava.es — te ayudarán con más detalle. El horario de atención es de lunes a viernes, de 9:00 a 18:00 h.";
  }

  if (/pedido|comprar|hacer un pedido|como compro|cómo compro/.test(text)) {
    return "Los pedidos se realizan a través de la web oficial de ITS LAVA: https://itslava.es/";
  }

  if (/coste de env[ií]o|coste envio|precio del env[ií]o|precio envio/.test(text)) {
    return "No dispongo de esa información. Te recomiendo consultarlo directamente en https://itslava.es/ o escribiendo a hola@itslava.es.";
  }

  if (/cu[aá]nto tarda|plazo|env[ií]o|envio|entrega/.test(text)) {
    return "Plazos estimados desde la salida del almacén:\n1. Península: 24–48 h.\n2. Islas Baleares: 3–7 días.\n3. Canarias y resto de Europa: 3–7 días.";
  }

  if (/devol|devolver|reembolso|retornar/.test(text)) {
    return "Para devolver un artículo:\n1. Verifica que no hayan pasado más de 14 días naturales desde la entrega.\n2. Comprueba que el producto está en perfectas condiciones.\n3. Contacta con ITS LAVA en hola@itslava.es para gestionar la devolución.\n4. El coste es de ~6 € en península/Baleares o ~15 € en Canarias/Europa.\nPareos y pañuelos no admiten devolución por higiene.";
  }

  if (/cambio|cambiar|otro art[ií]culo|otra talla/.test(text)) {
    return "No se realizan cambios directos.\n1. Debes devolver el artículo original siguiendo la política de devolución.\n2. Después, realizar un nuevo pedido con el artículo deseado.";
  }

  if (/tienda|tienda f[ií]sica|madrid|barcelona|d[oó]nde comprar/.test(text)) {
    return "Puedes encontrar ITS LAVA en:\n1. WOW CONCEPT — Calle Gran Vía 18, 28013 Madrid.\n2. WOW CONCEPT — Calle Serrano 52, 28009 Madrid.\n3. Ferent Bags — Calle Casanova 191, Barcelona.";
  }

  if (/contacto|email|correo|horario|atenci[oó]n/.test(text)) {
    return "Puedes contactar con ITS LAVA en hola@itslava.es. El horario de atención al cliente es de lunes a viernes, de 9:00 a 18:00 h. La respuesta por email suele llegar en 1–2 días laborales.";
  }

  if (/prensa|colaboraciones|marketing/.test(text)) {
    return "Para prensa o colaboraciones, el contacto es marketing@itslava.es.";
  }

  if (/cuidados|cuidado del producto|asesoramiento/.test(text)) {
    return "ITS LAVA ofrece asesoramiento sobre productos y cuidados. Si necesitas información concreta, te recomiendo escribir a hola@itslava.es.";
  }

  if (/its lava|itslava/.test(text)) {
    return "ITS LAVA es una marca española de bolsos y accesorios veganos confeccionados en España. Si quieres, puedo ayudarte con pedidos, envíos, devoluciones, cambios, tiendas físicas o contacto.";
  }

  return "No dispongo de esa información. Te recomiendo consultarlo directamente en https://itslava.es/ o escribiendo a hola@itslava.es.";
}

if (itsLavaMessages && itsLavaForm) {
  appendItsLavaMessage(
    "Hola, soy el asistente virtual oficial de ITS LAVA. ¿En qué puedo ayudarte?",
    "bot",
  );

  itsLavaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = itsLavaForm.elements.message;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    const value = input.value.trim();
    if (!value) {
      return;
    }

    appendItsLavaMessage(value, "user");
    input.value = "";

    window.setTimeout(() => {
      appendItsLavaMessage(replyItsLava(value), "bot");
    }, 160);
  });

  document.querySelectorAll("[data-itslava-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent?.trim() ?? "";
      if (!value) {
        return;
      }

      appendItsLavaMessage(value, "user");
      window.setTimeout(() => {
        appendItsLavaMessage(replyItsLava(value), "bot");
      }, 140);
    });
  });
}