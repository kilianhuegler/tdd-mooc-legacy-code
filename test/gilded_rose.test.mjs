import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

function updateOnce(name, sellIn, quality) {
  const item = new Item(name, sellIn, quality);
  const shop = new Shop([item]);
  shop.updateQuality();
  return shop.items[0];
}

describe("Gilded Rose -> normal items", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  test("before sell date -> quality and sellIn decrease by 1", () => {
    const item = updateOnce("foobar", 10, 20);
    expect(item.sellIn).to.equal(9);
    expect(item.quality).to.equal(19);
  })
  test("after sell date -> quality decreases by 2 and sellIn decreases by 1", () => {
    const item = updateOnce("foobar", -5, 20);
    expect(item.sellIn).to.equal(-6);
    expect(item.quality).to.equal(18);
  });

  test("on sell date -> quality decreases by 2 and sellIn decreases by 1", () => {
    const item = updateOnce("foobar", 0, 20);
    expect(item.sellIn).to.equal(-1);
    expect(item.quality).to.equal(18);
  });

  test("quality can not be negative", () => {
    const item = updateOnce("foobar", 10, 0);
    expect(item.quality).to.equal(0);
  })

  test("quality never goes below 0 when sellIn is negative", () => {
    const item = updateOnce("foobar", -1, 0);
    expect(item.quality).to.equal(0);
  })

  test("quality stops at zero after sell date", () => {
    const item = updateOnce("normal", -1, 1);
    expect(item.quality).to.equal(0);
  });
});

describe("Gilded Rose -> Aged brie", () => {
  test("Aged Brie increases in quality the older it gets per day before sell date", () => {
    const item = updateOnce("Aged Brie", 10, 20);
    expect(item.quality).to.equal(21);
    expect(item.sellIn).to.equal(9);
  })

  test("Aged Brie after sell date gains 2 quality", () => {
    const item = updateOnce("Aged Brie", -5, 20);
    expect(item.quality).to.equal(22);
    expect(item.sellIn).to.equal(-6);
  })

  test("Aged brie on sell date gains 2 quality", () => {
    const item = updateOnce("Aged Brie", 0, 20);
    expect(item.sellIn).to.equal(-1);
    expect(item.quality).to.equal(22);
  });

  test("Aged Brie quality never exceeds 50 (before sell date)", () => {
    const item = updateOnce("Aged Brie", 10, 50);
    expect(item.quality).to.equal(50);
  })

  test("Aged Brie quality never exceeds 50 (after sell date)", () => {
    const item = updateOnce("Aged Brie", 0, 50);
    expect(item.quality).to.equal(50);
  });
})


describe("Gilded Rose -> Sulfuras", () => {
  test("Sulfuras never decreases in quality or sellIn", () => {
    const item = updateOnce("Sulfuras, Hand of Ragnaros", 10, 80);
    expect(item.quality).to.equal(80);
    expect(item.sellIn).to.equal(10);
  })

  test("Sulfuras keeps quality and sellIn after sell date", () => {
    const item = updateOnce("Sulfuras, Hand of Ragnaros", -1, 80);
    expect(item.quality).to.equal(80);
    expect(item.sellIn).to.equal(-1);
  });
})