export default function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();

  const logInButton = document.querySelector('.g-signin2');
  const userData = document.querySelector('.user-data');
  const userEmail = document.querySelector('.user-email');
  const userImage = document.querySelector('.user-image');

  logInButton.classList.add('hidden');
  userData.classList.remove('hidden');
  userImage.style.background = `url('${profile.getImageUrl()}')`;
  userImage.style.backgroundSize = 'cover';
  userEmail.innerText = profile.getEmail();
}
