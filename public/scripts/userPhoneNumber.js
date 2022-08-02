const phoneNumberHTML = `
<section class="h-100 h-custom" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">
            <div class="row">
              <div class="col-lg-7">
                <!-- order container -->
                <h5 class="mb-3">
                  <a href="#!" class="text-body">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>
                    Back to restaurant
                  </a>
                </h5>
                <hr>
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p class="mb-1">Current cart</p>
                  </div>
                </div>
                <!-- loop over this -->
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img src="https://picsum.photos/150/150?random=1" class="img-fluid rounded-3"
                            alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5>Food Name</h5>
                          <p class="small mb-0">Food details</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 50px;">
                          <h5 class="fw-normal mb-0">1</h5>
                        </div>
                        <div style="width: 80px;">
                          <h5 class="mb-0">$9</h5>
                        </div>
                        <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- TO THIS! -->


                <!-- card details -->
              </div>
              <div class="col-lg-5">

                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0">Card details</h5>
                    </div>

                    <p class="small mb-2">Card type</p>
                    <a href="#!" type="submit" class="text-white"><i
                        class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-visa fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-amex fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                    <form class="mt-4">

                      <div class="form-outline form-white mb-4">
                        <input id="areaCode" type="text" class="form-control form-control-lg" siez="17"
                          placeholder="1" minlength="1" maxlength="2" />
                      </div>
                      <div class="form-outline form-white mb-4">
                        <input id="exchangeNum" type="text" class="form-control form-control-lg" siez="17"
                          placeholder="XXX" minlength="3" maxlength="3" />
                      </div>
                      <div class="form-outline form-white mb-4">
                        <input id="lineNum" type="text" class="form-control form-control-lg" siez="17"
                          placeholder="XXXX" minlength="4" maxlength="4" />
                      </div>

                      <hr class="my-4">

                      <button id='checkout-btn' type="submit" class="btn btn-info btn-block btn-lg">
                        <div class="d-flex justify-content-between">
                          <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;