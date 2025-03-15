let btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
    btn.style.visibility = "hidden";
    document.body.style.backgroundColor = "#003300";
    document.getElementById("terminal-head").firstElementChild.hidden = false;

    let messages = [
        "Initializing Hacking",
        "Reading your Files",
        "Password files Detected",
        "Sending all passwords and personal files to server",
        "Cleaning up"
    ];

    for (let text of messages) {
        await showContent(text);
    }
});

let showContent = (text) => {
    return new Promise((resolve) => {
        let d = document.createElement("p");
        d.className = "hack-content";
        d.innerText = `> ${text}`;
        document.body.appendChild(d);

        let dotCount = 0;
        let interval = setInterval(() => {
            if (dotCount < 3) {
                d.innerText += " .";
                dotCount++;
            } else {
                clearInterval(interval);
                setTimeout(resolve, 1000);
            }
        }, 1000);
    });
};
