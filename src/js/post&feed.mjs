console.log("Hello world");

function dynamicSidebar() {
     var footerHeight = document.querySelector("footer").offsetHeight;
     var sidebar = document.querySelector(".mobile-sidebar");
     sidebar.style.height = `calc(100vh - ${footerHeight}px)`;
     console.log("Footer height is:", footerHeight, "px");
}

dynamicSidebar();
