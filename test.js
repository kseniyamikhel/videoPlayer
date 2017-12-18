describe("formatTime", function() {

    it("should convert video duration into format 00:00", function() {
        assert.equal(formatTime(660, false), '11:00 ');
    });
    it("should convert video duration into format 00:00:00", function() {
        assert.equal(formatTime(3800, true), '01:03:20 ');
    });
});