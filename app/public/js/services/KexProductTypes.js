/**
 * Created by samiyuru on 5/15/14.
 */

kEX.service("kexProductTypes", function (kexPofiles) {

    var ProductBase = function (prdObj) {
        var prdTypeImgs = [];
        prdTypeImgs[0] = '/img/prdtypes/tickets.png';
        prdTypeImgs[1] = '/img/prdtypes/share.png';
        prdTypeImgs[2] = '/img/prdtypes/review.png';
        prdTypeImgs[3] = '/img/prdtypes/help.png';
        this.id = prdObj._id;
        this.title = prdObj.title;
        this.qty = prdObj.qty;
        this.remQty = prdObj.remQty;
        this.owner = prdObj.owner;
        this.price = prdObj.price || 0;
        this.isAuction = null;
        this.type = prdObj.type;
        this.expire = new Date(prdObj.expire);
        this.detail = prdObj.detail;
        this.dateAdded = new Date(prdObj.date);
        this.imgs = prdObj.imgs;
        this.prdCover = prdTypeImgs[this.type];
        this.delegate = null;
        this.ui = {
            showInfo: false
        };
    };

    //-----------------------------------------------

    var AuctionProduct = function (prdObj) {
        ProductBase.apply(this, [prdObj]);

        this.RECENT_BIDS_LIMIT = 4;
        this.ALL_BIDS_LIMIT = 999999;

        this.isAuction = true;
        this.bidsLimit = this.RECENT_BIDS_LIMIT;
        this.bids = [];
        var bids = prdObj.bids;
        var bidLen = bids.length;
        for (var i = 0; i < bidLen; i++) {
            var bid = bids[i];
            if (!this.bidRank && bid.person._id == kexPofiles.getLoggedProf()._id) this.bidRank = i + 1;
            this.bids.push({
                person: bid.person,
                bid: bid.bid,
                date: new Date(bid.date)
            });
        }
        this.newBid = "";
        this.updateBidRank();
    }

    AuctionProduct.prototype = Object.create(ProductBase.prototype);

    AuctionProduct.prototype.addBidToTop = function (person, date, bid) {
        this.bids.unshift({
            person: person,
            bid: bid,
            date: date
        });
        this.price = bid;
    };

    AuctionProduct.prototype.updateBidRank = function () {
        var loggedProfile = kexPofiles.getLoggedProf();
        var bidLen = this.bids.length;
        for (var i = 0; i < bidLen; i++) {
            var bid = this.bids[i];
            if (bid.person._id == loggedProfile._id) {
                this.bidRank = i + 1;
                return;
            }
        }
    }

    AuctionProduct.prototype.placeBid = function () {
        this.delegate.initBid(this);
    };

    AuctionProduct.prototype.showAllBids = function () {
        this.bidsLimit = this.ALL_BIDS_LIMIT;
    };

    AuctionProduct.prototype.showRecentBids = function () {
        this.bidsLimit = this.RECENT_BIDS_LIMIT;
    };

    AuctionProduct.prototype.isRecentBids = function () {//returns true if only recent bids are shown
        return (this.bidsLimit == this.RECENT_BIDS_LIMIT);
    };

    //-----------------------------------------------

    var FixedProduct = function (prdObj) {
        ProductBase.apply(this, [prdObj]);
        this.isAuction = false;
    }

    FixedProduct.prototype = Object.create(ProductBase.prototype);

    FixedProduct.prototype.purchase = function () {
        this.delegate.purchase(this);
    };

    //-----------------------------------------------

    var BiddedProductDeco = function (auctionObj) {
        var Decorated = function () {
            this.ui.showbids = false;
            this.ui.showInfo = false;

            this.placeBid = function () {
                this.delegate.placeBid(this);
            }

            this.showInfo = function () {
                this.ui.showInfo = true;
                this.ui.showbids = false;
            };

            this.hideInfo = function () {
                this.ui.showInfo = false;
            };

            this.showBids = function () {
                this.ui.showInfo = false;
                this.ui.showbids = true;
            };

            this.hideBids = function () {
                this.ui.showbids = false;
            };
        };
        Decorated.prototype = auctionObj;
        return new Decorated();
    };

    //----------------------------------------------

    this.ProductBase = ProductBase;
    this.AuctionProduct = AuctionProduct;
    this.FixedProduct = FixedProduct;
    this.BiddedProductDeco = BiddedProductDeco;

});