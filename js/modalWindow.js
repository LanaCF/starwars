let infoWindow;

// MyWindow ----------------------------------------------------------------------

class MyWindow {
    constructor(size, position, id, title) {
      this.size = size;
      this.position = position;
      this.id = id; 
      this.title = title;
    }
  
    create() {
        const myWindow = doc.createElement('div');
        const infoBox = doc.createElement('div');

        const posOpt = Object.keys(this.position);

        myWindow.style.cssText = 
            `
            position: fixed;
            z-index: 20000;
            background-color: #bbcedf;
            padding: 35px;
            width: ${this.size.w}px;
            height: ${this.size.h}px;
            ${posOpt[0]}: ${this.position[posOpt[0]]}px;
            ${posOpt[1]}: ${this.position[posOpt[1]]}px;
            `;

        infoBox.className = 'modal-window-info-block';
        infoBox.style.cssText =
            `
            width: 100%;
            height: 100%;
            text-align: justify;
            hyphens: auto;
            background-color: white;
            padding: 15px;
            overflow: hidden;
            overflow-y: scroll;
            `;

        infoBox.innerHTML = 
            `
            <p class="info-style"><b>Id:</b> ${this.id}</p>
            <p class="info-style"><b>Title:</b> ${this.title}</p>
            `;

        document.body.append(myWindow);
        myWindow.append(infoBox);

        return myWindow;
    }
}
    
// ModalWindow ----------------------------------------------------------------------
  
class ModalWindow extends MyWindow {
    create() {
        const myWindow = super.create();
        this.myWindow = myWindow;
        this.overlay = document.createElement('div');
        const overlay = this.overlay;

        overlay.style.cssText = 
            `
            position: fixed;
            z-index: 10000;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .7);
            overflow: hidden;
            `;
        
        document.body.append(overlay);

        overlay.innerHTML = 
            `
            <img src="img/close2.png" alt="" class='btn-close'>
            `;

        const btnClose = document.querySelector('.btn-close');
        btnClose.style.cssText = 
            `
            width: 30px;
            margin: 25px;
            position: absolute;
            cursor: pointer;
            top: 0;
            right: 0;
            `;

        btnClose.onclick = () => {
            myWindow.remove();
            overlay.remove();
        }

        return myWindow;
    }
}


  