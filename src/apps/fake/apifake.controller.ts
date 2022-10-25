import { Controller, Get } from "@nestjs/common";

// the @Controller() decorator function will instruct Nestjs
// to add a route of `/greet`
@Controller("fake")
export class FakeController {
  // the @Get() decorator function will instruct Nestjs
  // that this is the default method that should be
  // invoked when the user requests a `GET` to `/greet` endpoint
  @Get()
  fake() {
    return `{
        "repositories":[
            {
                "id":1,
                "state":604
            },{
                "id":2,
                "state":605
            },{
                "id":3,
                "state":606
            }
        ]
    }`;
  }
}