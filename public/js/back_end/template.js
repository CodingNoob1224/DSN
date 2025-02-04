


function setTemplate(data){
    let t_table_div = document.getElementsByClassName('t_table')[0];
    let t_table = t_table_div.getElementsByTagName('table')[0];
    let R_value_array = []
    let str = '';

    if(data == undefined){
        t_table.innerHTML = `
        <tr><th style="width:20%">模板名稱</th><th style="width:15%">套用數量</th><th style="width:15%">模板下載</th><th style="width:30%">使用資源</th><th style="width:20%">刪除</th></tr>
        <tr><td colspan="5">無資料</td></tr>`;
    }else{
        if(data.template.length == 0){
            t_table.innerHTML = `
            <tr><th style="width:20%">模板名稱</th><th style="width:15%">套用數量</th><th style="width:15%">模板下載</th><th style="width:30%">使用資源</th><th style="width:20%">刪除</th></tr>
            <tr><td colspan="5">無資料</td></tr>`;
        }else{
            str = `
            <tr><th style="width:20%">模板名稱</th><th style="width:15%">套用數量</th><th style="width:15%">模板下載</th><th style="width:30%">使用資源</th><th style="width:20%">刪除</th></tr>`;


            

            
            for(i = 0;i<data.template.length;i++){
                
                R_value_array = [];
                for(j = 0;j<data.template[i].T_Resource.length;j++){
                    R_value_array.push(data.template[i].T_Resource[j]);
                }
                
                str += `<tr><td>${data.template[i].T_Name}</td><td>${data.template[i].T_Use}</td><td><img src="../../img/download.png"></td><td>
                <select>
                    ${Select_Option_HTML('',R_value_array,R_value_array)}
                </select>
                </td><td><img src="../../img/bin.png"></td></tr>`;
            }
            console.log(str)
            t_table.innerHTML = str;
        }
        
    }
}



function setTemplate_edit(data){
    let lable_area = document.getElementsByClassName('lable_area')[0];
    let span = lable_area.getElementsByTagName('span');
    let html_area = document.getElementsByClassName('html_area')[0];

    span[0].innerHTML = '標籤數量：' + data.all_label;
    span[1].innerHTML = '文字標籤：' + data.text_label;
    span[2].innerHTML = '照片標籤：' + data.img_label;
    span[3].innerHTML = '連結標籤：' + data.url_label;

    html_area.innerHTML = '';
    for(i = 0;i< data.container.length;i++){
        let div = document.createElement('div');
        let str = '';

        if(data.container[i].type == 'title'){
            div.setAttribute('class','container2_title');
            str += `
            <div class="item">
                <div class="item_title">${data.container[i].id[0]}(標題)</div>
                <div class="item_label">
                    <span>項目提示：${data.container[i].note[0]}</span>
                </div>
                <div class="item_content">
                    <input placeholder="請輸入標題" value="${data.container[i].content[0]}">
                </div>
            </div>
            `;
        }else{
            div.setAttribute('class','container2');
            

            for(j = 0;j < data.container[i].item;j++){
                
                if(data.container[i].item_type[j] == 'text'){
                    str += `
                    <div class="item">
                        <div class="item_title">${data.container[i].id[j]}(文字)</div>
                        <div class="item_label">
                            <span>項目提示：${data.container[i].note[j]}</span>
                        </div>
                        <div class="item_content">
                            <textarea placeholder="請輸入文字內容">${data.container[i].content[j]}</textarea>
                        </div>
                    </div>                    
                    `;
                }else if(data.container[i].item_type[j] == 'url'){
                    str += `
                    <div class="item">
                        <div class="item_title">${data.container[i].id[j]}(連結)</div>
                        <div class="item_label">
                            <span>項目提示：${data.container[i].note[j]}</span>
                        </div>
                        <div class="item_content">
                            <textarea placeholder="請輸入URL或是網址">${data.container[i].content[j]}</textarea>
                        </div>
                    </div> 
                    `;
                }else if(data.container[i].item_type[j] == 'img'){
                    str += `
                    <div class="item">
                        <div class="item_title">${data.container[i].id[j]}(照片)</div>
                        <div class="item_label">
                            <span>項目提示：${data.container[i].note[j]}</span>
                        </div>
                        <div class="item_content">
                            <img src="${container_img(data.container[i].content[j])}" title="上傳照片">
                        </div>
                    </div>                    
                    `;
                }
            }

            
        }

        div.innerHTML = str;
        html_area.appendChild(div);
    }
}



function setTemplate_r(data){
    let r_table_div = document.getElementsByClassName('r_table')[0];
    let r_table = r_table_div.getElementsByTagName('table')[0];
    let number = document.getElementsByClassName('number')[0];
    let str = '';

    if(data == undefined){
        r_table.innerHTML = `
        <tr><th>資源名稱</th><th>需求名稱</th><th>查看資源</th></tr>
        <tr><td colspan="4">無資料</td></tr>`;
    }else{
        if(data.resource.length == 0){
            r_table.innerHTML = `
            <tr><th>資源名稱</th><th>需求名稱</th><th>查看資源</th></tr>
            <tr><td colspan="4">無資料</td></tr>`;
        }else{
            number.innerHTML = '套用數量：' + data.resource.length;
            str = `
            <tr><th>資源名稱</th><th>需求名稱</th><th>查看資源</th></tr>`;
            for(i = 0;i<data.resource.length;i++){
                str += `<tr><td>${data.resource[i].R_Name}</td><td>${data.resource[i].D_Name}</td><td><img src="../../img/language.png"></td></tr>`
            }  //這邊要加上href
            r_table.innerHTML = str;
        }
    }
}


function setTemplate_setting(data){
    let T_Name = document.getElementsByName('T_Name')[0];
    

    if(data != undefined){
        T_Name.setAttribute('value',data.T_Name);
    }
}




function Select_Option_HTML(value,value_array,id_array){
    str = '';
    for(c = 0;c<value_array.length;c++){
        if(id_array[c] == value){
            str += `<option selected value="${id_array[c]}">${value_array[c]}</option>`;
        }else{
            str += `<option value="${id_array[c]}">${value_array[c]}</option>`;
        }
    }
    
    return str;
}
function container_img(img_name){
    if(img_name == ''){
        return '../../img/plus.png';
    }else{
        return '../../img/' + img_name;
    }
}