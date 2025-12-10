import "./style.css";

// Setup Learn More Buttons
document.querySelectorAll('.learn-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const content = document.getElementById(targetId);
    
    
    if (content) {
      content.classList.toggle('hidden');
      
      if (content.classList.contains('hidden')) {
        button.textContent = 'Learn More →';
      } else {
        button.textContent = 'Show Less ↑';
      }
    }
  });
});
