export function setupTitle3DEffect(
  titleEl: HTMLElement,
  isMouseDown: React.MutableRefObject<boolean>
) {
  function applyTitle3DEffect(e: MouseEvent) {
    if (!isMouseDown.current) return;
    const rect = titleEl.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rotateX = (-y / rect.height) * 5;
    const rotateY = (x / rect.width) * 5;

    titleEl.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    const shadowX = rotateY * 2;
    const shadowY = rotateX * 2;
    titleEl.style.textShadow = `${shadowX}px ${shadowY}px 10px rgba(0,0,0,0.25)`;
  }

  function resetTitle3DEffect() {
    titleEl.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    titleEl.style.textShadow = "";
  }

  const handleMouseDown = () => (isMouseDown.current = true);
  const handleMouseUp = () => {
    isMouseDown.current = false;
    resetTitle3DEffect();
  };
  const handleMouseMove = (e: MouseEvent) => applyTitle3DEffect(e);

  titleEl.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("mousemove", handleMouseMove);

  // Returnera en funktion som tar bort event listeners
  return () => {
    titleEl.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}
