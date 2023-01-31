// import { describe, expect, it, beforeEach, jest } from "@jest/globals"
// import Foreground from "@/components/Foreground"

// describe("Foreground", () => {
//   let foreground, context

//   beforeEach(() => {
//     context = {
//       drawImage: jest.fn(),
//     }
//     foreground = new Foreground(50, 30, context)
//   })

//   it("should construct Foreground correctly", () => {
//     expect(foreground.context).toBe(context)
//     expect(foreground.x).toBe(50)
//     expect(foreground.y).toBe(30)
//     expect(foreground.wigth).toBe(1200)
//     expect(foreground.height).toBe(150)
//     expect(foreground.speed).toBe(3)
//     expect(foreground.sprit.src).toBe("../assets/img/foreground.png")
//   })

//   it("should draw Foreground correctly", () => {
//     foreground.draw()
//     expect(context.drawImage).toHaveBeenCalledWith(
//       foreground.sprit,
//       50,
//       30,
//       1200,
//       150
//     )
//     expect(context.drawImage).toHaveBeenCalledWith(
//       foreground.sprit,
//       -1150,
//       30,
//       1200,
//       150
//     )
//   })

//   it("should update Foreground correctly", () => {
//     foreground.update()
//     expect(foreground.x).toBe((50 - 3) % 600)
//   })
// })
