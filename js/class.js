class f_element{
    constructor(){
        this.ftype_check=false;
        this.fprice_check=false;
        this.fid_check=false;
        this.fname_check=false;
        this.famount_check=false;
        this.famount_min=0;
        this.famount_max=0;
        this.fprice_min=0;
        this.fprice_max=0;
        this.ftype_text="";
        this.fid_text="";
        this.fname_text="";
    }
    filter_action1(){
        this.ftype_check=document.getElementById("ftype_check").checked;
        this.fprice_check=document.getElementById("fprice_check").checked;
        this.fid_check=document.getElementById("fid_check").checked;
        this.fname_check=document.getElementById("fname_check").checked;
        this.famount_check=document.getElementById("famount_check").checked;

        this.famount_min=document.getElementById("famount_min").value;
        this.famount_max=document.getElementById("famount_max").value;
        this.fprice_min=document.getElementById("fprice_min").value;
        this.fprice_max=document.getElementById("fprice_max").value;
        this.ftype_text=document.getElementById("ftype_text").value;
        this.fid_text=document.getElementById("fid_text").value;
        this.fname_text=document.getElementById("fname_text").value;
    }
}
export default f_element;