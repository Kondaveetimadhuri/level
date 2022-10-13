var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let loadImage= (src,callback)=>{
    let img=document.createElement("img");
    img.onload=()=> callback(img);
    img.src=src;
};

let imagePath=(frameNumber,animation)=>{
    return "/images/"+animation+"/"+ frameNumber +".png";
};
let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],
    forward:[1,2,3,4,5,6],
    backward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
};
let loadImages=(callback)=>{
    let images={idle:[],kick:[],punch:[],forward:[],backward:[],block:[]};
    let loadCount=0;
    ["idle","kick","punch","forward","backward","block"].forEach((animation)=>{
        let aniframes=frames[animation];
        loadCount=loadCount+aniframes.length;
        aniframes.forEach((frameNumber)=>{
            let path=imagePath(frameNumber,animation);
        loadImage(path,(image)=>{
            images[animation][frameNumber-1]=image;
            loadCount--;
            if(loadCount===0)
            {
                callback(images);
            }
        });
        });
    });
};
let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,images[animation].length*100);
};
loadImages((images)=>{
    let selAn=[];
    let aux=()=>{
        let sa;
        if(selAn.length===0)
        {
            sa="idle";
        }
        else{
            sa=selAn.shift();
        }
        animate(ctx,images,sa,aux);
    };
    aux();
    document.getElementById("kick").onclick=()=>{
        selAn.push("kick");
    };
    document.getElementById("punch").onclick=()=>{
        selAn.push("punch");
    };
    document.getElementById("forward").onclick=()=>{
        selAn.push("forward");
    };
    document.getElementById("block").onclick=()=>{
        selAn.push("backward");
    };
    document.getElementById("kick").onclick=()=>{
        selAn.push("block");
    };
    
    document.addEventListener("keyup",(event)=>{
        const key=event.key;
        if(key==="ArrowLeft"){
            selAn.push("kick");
        }else if(key==="ArrowRight"){
            selAn.push("punch");
        }
        else if(key==="ArrowUp"){
            selAn.push("forward");
        }else if(key==="ArrowDown"){
            selAn.push("backward");
        }else{
            selAn.push("block");
        }
    });
});
