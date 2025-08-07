

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("styles.css");
document.head.appendChild(link);
let enabled = true;

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
    if (!enabled) return;

    const target = e.target;
    const tag = target.tagName;
    const classList = target.className;
    const id = target.id;
    target.style.backgroundColor = "yellow";



    const tooltipText = `Tag: ${tag}, Class: ${classList || "none"}, ID: ${id || "none"}`;

    let tooltip = document.getElementById("hover-tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.id = "hover-tooltip";
        document.body.appendChild(tooltip);
    }

    tooltip.innerText = tooltipText;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.left = `${e.clientX + 10}px`;
});

document.addEventListener("mouseout", () => {
    const tooltip = document.getElementById("hover-tooltip");
    if (tooltip) tooltip.remove();
});
