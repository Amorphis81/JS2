//класс ES6. Переделанный Container
class Container {
  constructor() {
    this.id = "";
    this.className = "";
    this.htmlCode = "";
  }
  render() {
    return this.htmlCode;
  }
  remove(){
    let classList = document.getElementsByClassName('menu-item');
    let lastItemMenu = classList.length - 1;
    classList[lastItemMenu].remove();    
  }
}

//класс ES6. Переделка Menu
class Menu extends Container {
  constructor(my_id, my_class, my_items) {
    super();
    this.id = my_id;
    this.className = my_class;
    this.items = my_items;
  }
  render() {    
    let ul = document.createElement('ul');
    ul.id = 'menu';
    document.body.appendChild(ul);
    for (let item of this.items){
      ul.appendChild(item.render());
    }
  }
}

//класс ES6. Переделка MenuItem(пункты меню)
class MenuItem extends Container {
  constructor(my_href, my_name, my_id) {
    super();
    this.className = 'menu-item';
    this.href = my_href;
    this.name = my_name;
    this.idName = my_id;
  }
  render() {    
    let li = document.createElement('li');
    let link = document.createElement('a');
    link.href = this.href;
    link.innerText = this.name;
    li.className = this.className;
    li.id = this.idName;
    li.appendChild(link);
    return li;
  }
}

//подменю
class SubMenu extends Menu {
  constructor(idToAdd, nameSubItem, subItemHref = '#'){
    super();
    this.idToAdd = idToAdd;
    this.nameSubItem = nameSubItem;
    this.subItemHref = subItemHref;
  }
  render() {
    let itemToAdd = document.getElementById(this.idToAdd);
    let ul = document.createElement('ul');
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    link.href = this.subItemHref;
    listItem.appendChild(link); 
    link.innerText = this.nameSubItem;
    itemToAdd.appendChild(ul).appendChild(listItem);
  }
}


init = () => {
  //объявление пунктов меню
  let m_item1 = new MenuItem('/', 'Главная', 'item1');
  let m_item2 = new MenuItem('/catalogue/', 'Каталог', 'item2');
  let m_item3 = new MenuItem('/gallery/', 'Галерея', 'item3');
  
  let m_items = [m_item1, m_item2, m_item3];

  //создание меню
  let menu = new Menu('my_menu', 'My_class', m_items);
  menu.render();
  //объявление события на нажатие кнопки
  document.getElementById('remove-button').addEventListener('click', menu.remove);

  //создание подменю
  let subMenuItem1 = new SubMenu('item1', 'Пункт1');
  subMenuItem1.render();
  let subMenuItem2 = new SubMenu('item2', 'Пункт2');
  subMenuItem2.render();
  let subMenuItem3 = new SubMenu('item3', 'Пункт3');
  subMenuItem3.render();
}

window.onload = init;