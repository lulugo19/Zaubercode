export function slotsAsData(parent: HTMLElement) {
  const data: any = {};
  parent.querySelectorAll("[slot]").forEach(el => {
    // convert 'nick-name' into 'nickName' for easy JS access
    // set the *DOM node* as data property value
    data[el.getAttribute("slot").replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())] = el; // <- this is a DOM node, not a string ;-)
  });
  return data;
}
