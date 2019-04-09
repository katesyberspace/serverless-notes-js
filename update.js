import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    //define the key of the item to be updated
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    //define attribute to be updated
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || nul
    },
    //specifies if and how to return the item's attributes
    ReturnValues: "ALL_NEW"
  }

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({status: true});
  } catch (error) {
    console.log(error)
    return failure({status: false});
  }

}