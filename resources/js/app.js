import axios from 'axios'

let addToCart = document.querySelectorAll('.add_to_cart')

function updateCart(momo) {
    // 
    axios.post('./update_cart', momo).then(res => {
        console.log(res)
    })

}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let momo = JSON.parse(btn.dataset.momo)
        updateCart(momo)
    })
})