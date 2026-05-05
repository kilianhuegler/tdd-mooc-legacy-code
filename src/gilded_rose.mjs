export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case "Aged Brie":
          updateAgedBrie(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          updateSulfuras(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          updateBackstagePasses(item);
          break;
        default:
          updateNormal(item);
          break;
      }
    }

    return this.items;
  }
}

function updateAgedBrie(item) {
  if (item.quality < 50) {
    item.quality++;
  }
  item.sellIn--;
  if (item.sellIn < 0 && item.quality < 50) {
    item.quality++;
  }
}

function updateSulfuras(item) {}

function updateBackstagePasses(item) {
  if (item.quality < 50) {
    item.quality++;
    if (item.sellIn < 11 && item.quality < 50) {
      item.quality++;
    }
    if (item.sellIn < 6 && item.quality < 50) {
      item.quality++;
    }
  }
  item.sellIn--;
  if (item.sellIn < 0) {
    item.quality = 0;
  }
}

function updateNormal(item) {
  if (item.quality > 0) {
    item.quality--;
  }
  item.sellIn--;
  if (item.sellIn < 0 && item.quality > 0) {
    item.quality--;
  }
}
