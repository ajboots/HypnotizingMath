extern crate wasm_bindgen;
use std::f64::consts::PI;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn arcs(
    spare_value: f64,
    current_time: f64,
    arc_count: f64,
    ball: bool,
    fast_inside: bool,
    arc_1_speed: i32,
    arc_2_speed: i32,
) {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    // context.set_fill_style(&"rgb(55,55,55)".into());
    let max_dimension: i32 = std::cmp::min(canvas.width() as i32, canvas.height() as i32);
    let center = max_dimension as f64 / 2.0;
    context.clear_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());
    // arc(x, y, radius, startAngle, endAngle)
    // context.move_to(, );
    let size: i32 = max_dimension;
    pattern_builder(
        size,
        context,
        current_time,
        arc_count,
        center,
        ball,
        fast_inside,
        i32::min(arc_1_speed, arc_2_speed),
        i32::max(arc_1_speed, arc_2_speed),
    );
}

pub fn pattern_builder(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    total_arcs: f64,
    center: f64,
    ball: bool,
    fast_inside: bool,
    arc_1_speed: i32,
    arc_2_speed: i32,
) {
    let mut radius = size / 2 - 10;
    let arc_spacing = radius as f64 / total_arcs;

    while radius > 0 {
        //either the speed of the arcs decreases as you move away from the center or increases
        let mut inner_speed = radius;
        if fast_inside {
            inner_speed = size - radius;
        }
        //calcaulate an angle based on the current arc placement and time
        let angle = 0.001 * (inner_speed as f64 * current_time);
        //this arbitrary angle is + PI so arcs are oriented at the top of the screen
        let arc_angle_1 = angle * arc_1_speed as f64;
        let arc_angle_2 = (angle * arc_2_speed as f64) + PI;

        ellipse_builder(&context, ball, center, radius, arc_angle_1, arc_angle_2);

        radius -= arc_spacing as i32;
    }
}
// let functions = arc_1;

fn ellipse_builder(
    context: &web_sys::CanvasRenderingContext2d,
    ball: bool,
    center: f64,
    radius: i32,
    arc_angle_1: f64,
    arc_angle_2: f64,
) {
    context.begin_path();
    let mut cww = true;
    if (arc_angle_1 / (2.0 * PI)) as i64 % 2 == 0 {
        cww = true;
    }
    let mut ellipse_y = radius as f64;
    if ball {
        ellipse_y = center;
    }
    context
        .ellipse_with_anticlockwise(
            center,
            center,
            radius as f64,
            ellipse_y,
            0.0,
            arc_angle_1,
            arc_angle_2,
            cww,
        )
        .unwrap();
    context.stroke();
    //create lines to close pie slice
    context.move_to(
        arc_angle_2.cos() * radius as f64 + center,
        arc_angle_2.sin() * ellipse_y + center,
    );
    context.line_to(center, center);
    context.line_to(
        arc_angle_1.cos() * radius as f64 + center,
        arc_angle_1.sin() * ellipse_y + center,
    );
    //fill pie slice
    let hue = &(230 + radius as i32 * 250 / (center as i32)).to_string();
    let color = "hsla(".to_owned() + hue + ",80%,50%,0.2)";
    context.set_fill_style(&(color.into()));
    context.fill();
}
