const navLinks = document.getElementsByClassName("nav-links");
for (const link of navLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToPosition(link.getAttribute("href"));
  });
}

function scrollToPosition(positionId) {
  const elmnt = document.getElementById(positionId.split("#").pop());
  elmnt.scrollIntoView({ behavior: "smooth" });
}

(function initTouchAction() {
  const section = document.getElementById("section-races-carousel");
  const tabsIds = [
    "tab-button-halfingai",
    "tab-button-uritonai",
    "tab-button-tabaksiai",
    "tab-button-minotaurai",
  ];

  let startx; // starting x coordinate of touch point
  let dist = 0; // distance traveled by touch point
  let touchobj = null; // Touch object holder

  section.addEventListener(
    "touchstart",
    function (e) {
      touchobj = e.changedTouches[0]; // reference first touch point
      startx = parseInt(touchobj.clientX); // get x coord of touch point
    },
    false
  );

  section.addEventListener(
    "touchmove",
    (e) =>
      debounce(() => {
        touchobj = e.changedTouches[0]; // reference first touch point for this event
        dist = parseInt(touchobj.clientX) - startx; // calculate dist traveled by touch point
        // move box according to starting pos plus dist
        // with lower limit 0 and upper limit 380 so it doesn't move outside track:
        if (dist < -20) {
          slideRight(tabsIds);
        } else {
          slideLeft(tabsIds);
        }
      }),
    false
  );
})();

function slideLeft(tabsIds) {
  const index = getIndexOfNextTabToActivate(tabsIds, "left");
  document.getElementById(tabsIds[index]).click();
}

function slideRight(tabsIds) {
  const index = getIndexOfNextTabToActivate(tabsIds, "right");
  document.getElementById(tabsIds[index]).click();
}

function getIndexOfNextTabToActivate(tabs, direction) {
  const index = getIndexOfActiveTab(tabs);
  if (direction === "right") {
    return getIndexOfRightTab(index, tabs.length - 1);
  } else {
    return getIndexOfLeftTab(index, tabs.length - 1);
  }
}

function getIndexOfRightTab(index, length) {
  if (index === length) return 0;
  return ++index;
}
function getIndexOfLeftTab(index, length) {
  if (index === 0) return length;
  return --index;
}

function getIndexOfActiveTab(tabs) {
  const tab = tabs.find((tab) => {
    const tabTag = document.getElementById(tab);
    return tabTag.classList.contains("active");
  });
  return tabs.indexOf(tab);
}

const tabsLinks = [
  { "tab-button-halfingai": "tab-halfingai" },
  { "tab-button-uritonai": "tab-uritonai" },
  { "tab-button-tabaksiai": "tab-tabaksiai" },
  { "tab-button-minotaurai": "tab-minotaurai" },
];

document.querySelectorAll(".tablinks").forEach((tab, index) => {
  if (tab) {
    tab.addEventListener("click", (event) => {
      openCity(event, tabsLinks[index][tab.id]);
    });
  }
});
function openCity(evt, raceName) {
  console.log(raceName);
  let i;
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(raceName).style.display = "block";
  evt.currentTarget.className += " active";
}
