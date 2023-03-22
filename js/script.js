import product from "./product.js";
import f_element from "./class.js";

let tbody=document.getElementById("tbody1");
let filter_product;

function print_products(object_arr,tbody){
    try{
        tbody.innerHTML="";
        for(var i=0;i<object_arr.length;i++){
            tbody.innerHTML+=`
                <div class="row col-14">
                    <div class="d-flex bc-card">
                        <div class="col-3 rounded overflow-hidden align-self-center item-img">
                            <img class="card-img-top" src="${object_arr[i].img}" alt="Title">
                        </div>
                        <div class="col rounded overflow-hidden">
                            <div class="card-body">
                                <strong><h4 class="card-title">${object_arr[i].ProductName}</h4></strong>
                                <p class="card-text">
                                    Type : ${object_arr[i].ProductType}<br>
                                    Amount : ${object_arr[i].Amount}<br>
                                    ID : ${object_arr[i].ProductNumber}<br>
                                    </p>
                                <div class="row d-flex justify-content-start">
                                    <div class="col">
                                        <a name="" id="" class="btn btn-primary col-2 buy-buttom" href="#" role="button">$ ${object_arr[i].Price}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }catch(error){
        alert(error);
    }
}
function filter(f_element_obj){
    let type_check=f_element_obj.ftype_check
    let price_check=f_element_obj.fprice_check
    let id_check=f_element_obj.fid_check
    let name_check=f_element_obj.fname_check
    let amount_check=f_element_obj.famount_check

    let amount_min_text=f_element_obj.famount_min
    let amount_max_text=f_element_obj.famount_max
    let price_min_text=f_element_obj.fprice_min
    let price_max_text=f_element_obj.fprice_max
    let type_text=f_element_obj.ftype_text
    let id_text=f_element_obj.fid_text
    let name_text=f_element_obj.fname_text

    let temp=product.filter((index)=>{
        if(amount_check){
            if(!((index.Amount>=amount_min_text)&&(index.Amount<=amount_max_text))){
                return false;
            }
        }
        if(price_check){
            if(!((index.Price>=price_min_text)&&(index.Price<=price_max_text))){
                return false;
            }
        }
        if(type_check){
            if(!(type_text.includes(index.ProductType))){
                return false;
            }
        }
        if(id_check){
            if(!(id_text.includes(index.ProductNumber))){
                return false;
            }
        }
        if(name_check){
            if(!(name_text.includes(index.ProductName))){
                return false;
            }
        }
        return true;
    });
    filter_product=temp;
    print_ifnot_empty();
}
function search(){
    try{
        let text=document.getElementById("search-text").value;
        if(text!="*"){
            let Numbers=product.filter((index)=>{return text.includes(index.ProductNumber);});
            let Names=product.filter((index)=>{return text.includes(index.ProductName);});
            let Types=product.filter((index)=>{return text.includes(index.ProductType);});

            filter_product=new Array();
            filter_product=filter_product.concat(Numbers,Names,Types);

            let duplicated=new Array();
            filter_product.forEach((index)=>{
                let temp=filter_product.filter((index2)=>{return index2.ProductNumber==index.ProductNumber});
                if(temp.length>1) {
                    if(!(duplicated.includes(index.ProductNumber))){
                        duplicated.push(index.ProductNumber);
                    }
                }
            });
                        
            for(var i=0;i<duplicated.length;i++){
                let rmindex=-1;
                for(var k of filter_product){
                    rmindex++;
                    if(k.ProductNumber==duplicated[i]){
                        filter_product.splice(rmindex,1);
                        break;
                    }
                }
            }
            print_ifnot_empty();
        }else{
            print_products(product,tbody);
        }
    }catch(error){
        alert(error);
    }
}
function print_ifnot_empty(){
    if(filter_product.length==0){
        Swal.fire(
        'Not Found',
        'Cannot find your product',
        'question'
        );
    }else{
        print_products(filter_product,tbody);
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product Founded',
        showConfirmButton: false,
        timer: 1500
        });
    }
}
function simple_search(){
    let price_no_restricted=document.getElementById("price_no_restricted").checked;
    let price_100=document.getElementById("price_100").checked;
    let price_10000=document.getElementById("price_10000").checked;
    let price_more=document.getElementById("price_more").checked;

    let amount_no_restricted=document.getElementById("amount_no_restricted").checked;
    let amount_1000=document.getElementById("amount_1000").checked;
    let amount_5000=document.getElementById("amount_5000").checked;
    let amount_20000=document.getElementById("amount_20000").checked;
    let amount_more=document.getElementById("amount_more").checked;

    let type_3C=document.getElementById("type_3C").checked;
    let type_drink=document.getElementById("type_drink").checked;
    let type_food=document.getElementById("type_food").checked;

    let temp=new f_element();
    if(!price_no_restricted){
        temp.fprice_check=true;
    }
    if(!amount_no_restricted){
        temp.famount_check=true;
    }
    if(type_3C||type_drink||type_food){
        temp.ftype_check=true;
    }
    if(price_100){
        temp.fprice_min=0;
        temp.fprice_max=100;
    }
    if(price_10000){
        temp.fprice_min=101;
        temp.fprice_max=10000;
    }
    if(price_more){
        temp.fprice_min=10001;
        temp.fprice_max=Infinity;
    }
    if(amount_1000){
        temp.famount_min=0;
        temp.famount_max=1000;
    }
    if(amount_5000){
        temp.famount_min=1001;
        temp.famount_max=5000;
    }
    if(amount_20000){
        temp.famount_min=5001;
        temp.famount_max=20000;
    }
    if(amount_more){
        temp.famount_min=20001
        temp.famount_max=Infinity;
    }
    if(type_3C){
        temp.ftype_text+="3C ";
    }
    if(type_drink){
        temp.ftype_text+="飲料 ";
    }
    if(type_food){
        temp.ftype_text+="食品 ";
    }
    filter(temp);
}
//Event Listener
document.getElementById("confirm").addEventListener("click",()=>{
    simple_search();
});
document.getElementById("refresh").addEventListener("click",()=>{
    print_products(product,tbody);
});
document.getElementById("search").addEventListener("click",()=>{
    search();
});
document.getElementById("filter").addEventListener("click",()=>{
    let tempobj=new f_element();
    tempobj.filter_action1();
    filter(tempobj);
});
//Main
window.onload=()=>{
    print_products(product,tbody);
    filter_product=product;
};