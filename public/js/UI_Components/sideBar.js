/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() { // eslint-disable-line no-unused-vars
    document.getElementById('mySidenav').style.width = '380px';
    document.getElementById('main').style.marginLeft = '50px';
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() { // eslint-disable-line no-unused-vars
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }