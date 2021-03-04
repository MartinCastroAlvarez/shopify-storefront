// Handle the Form state with this flag.
let $isLoading = false

// Handle GET request to the backend.
const request = async ($method, $payload) => {
    console.log("Method:", $method)
    console.log("Payload:", $payload)
    // Start being busy.
    if ($isLoading) return
    $('#catalog-loading').show()
    $isLoading = true
    // Hide errors.
    $("#catalog-error").hide()
    // Send request to the API.
    return $.ajax({
        type: $method,
        contentType: "application/json",
        crossDomain: true,
        dataType: 'json',
        headers: {
            "x-api-key": "{{API_KEY}}",
        },
        url: "{{API_URL}}/v1/products",
        data: $payload,
        // Handle successful requests.
        // Errors might still return a 200 OK.
        success: (xhr, textStatus) => {
            console.log("Response:", xhr, textStatus)
            if (xhr.head.error) {
                $("#catalog-error").show()
            } else {
                render(xhr.body.products.map(x => {
                    let price = ""
                    if (x.variants.length) {
                        const minPrice = Math.max.apply(Math, x.variants.map(y => y.price))
                        price = "{{CURRENCY}}" + minPrice
                    }
                    return {
                        id: x.id,
                        name: x.title,
                        price: price,
                        image: x.image.src,
                    }
                }))
            }
        },
        // Handling a fatal error such as a network problem.
        error: (xhr, textStatus, errorThrown) => {
            console.error("Error:", xhr, textStatus, errorThrown)
            $("#catalog-error").show()
        },
        // Handling the rend of all requests.
        complete: () => {
            $("#catalog-loading").hide()
            $isLoading = false
        }
    })
}

// Handle request to render response.
const render = rows => {
    console.log("Render:", rows)
    $('#catalog-products').html("")
    rows.forEach(row => {
        $('#catalog-products').append(`
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-4 padding-sm catalog-product">
                <div class="catalog-image"
                    style="background-image: url('${row.image}')">
                </div>
                <div class="catalog-content padding-sm">
                    <p class="nowrap">${row.name}</p>
                    <br/>
                    <h3>${row.price}</h3>
                    <br/>
                    <form target="product.html" method="GET">
                        <input type="hidden" name="product_id" value="${row.id}"/>
                        <button class="padding-sm">{{strings.View}}</button>
                    </form>
                </div>
            </div>
        `)
    })
}

$(document).ready(() => {
    $("#catalog-error").hide()
    $("#catalog-loading").hide()
    $("#catalog-products").html("")
    request("get", {
        search: unescape(PARAMS.search || "").replace(/\+/g," "),
        // collection: PARAMS.collection || {{collections.Default}},
        collection: 123123,
        limit: PARAMS.limit || 30,
        since_id: PARAMS.since_id || "",
    })
})
