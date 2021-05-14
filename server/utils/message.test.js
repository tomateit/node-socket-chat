const expect = require("expect");

const {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", ()=> {
        let from = "January";
        let text = "From winter sun to summer snow";
        let generatedMessage = generateMessage(from, text);

        expect(typeof generatedMessage.createdAt).toBe("number");
        expect(generatedMessage).toMatchObject({from, text});

    });
});