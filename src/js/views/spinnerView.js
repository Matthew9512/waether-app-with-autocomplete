export const loader = function () {
  const container = document.querySelector('.container');
  const html = `
    <div class="box">
  <div class="spinner">
    <span class="circle"></span>
    <span class="circle"></span>
    <span class="circle"></span>
    <span class="circle"></span>
  </div>
</div>`;
  container.insertAdjacentHTML('afterbegin', html);
};
