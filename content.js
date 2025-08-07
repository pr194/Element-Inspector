let enabled = true;
let currentElement = null;
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "TOGGLE_HOVER") {
        enabled = !enabled;
        if (!enabled) {
            const tooltip = document.getElementById("hover-tooltip");
            if (tooltip) tooltip.remove();
        }
    }
});

document.addEventListener("mouseover", (e) => {
    if (!enabled || e.target === currentElement) return;

    const target = e.target;
    const tag = target.tagName;
    const classList = target.className;
    const id = target.id;
    e.target.style.outline = "1px solid red";

    const tooltipText = `Tag: ${tag}, Class: ${classList || "none"}, ID: ${id || "none"}`;

    let tooltip = document.getElementById("hover-tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.id = "hover-tooltip";
        tooltip.style.position = "fixed";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        tooltip.style.color = "white";
        tooltip.style.padding = "8px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.zIndex = "9999";
        tooltip.style.maxWidth = "300px";
        tooltip.style.fontSize = "12px";
        tooltip.style.pointerEvents = "none";
        document.body.appendChild(tooltip);
    }

    tooltip.innerText = tooltipText;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.left = `${e.clientX + 10}px`;
});

document.addEventListener("mouseout", (e) => {
    const tooltip = document.getElementById("hover-tooltip");
    e.target.style.outline = "";
    if (tooltip) tooltip.remove();
});
