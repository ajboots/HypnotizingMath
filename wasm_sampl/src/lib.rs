extern crate wasm_bindgen;
use std::f64::consts::PI;

use wasm_bindgen::prelude::*;
// type ArcFunc = fn(i32, i32) -> i32;
fn maze(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    arc_spacing: f64,
    center: f64,
) {
    let mut radius = size / 2 - 1;
    while radius > 0 {
        context.begin_path();

        let angle = 0.1 * ((size - radius) as f64 * current_time) / (arc_spacing / 2.0);
        let arc_angle_1 = -angle;
        let arc_angle_2 = radius as f64 / 150.0;
        let mut cww = true;
        if (arc_angle_1 / (2.0 * PI)) as i64 % 2 == 0 {
            cww = true;
        }
        context
            .arc_with_anticlockwise(center, center, radius as f64, arc_angle_1, arc_angle_2, cww)
            .unwrap();
        context.stroke();
        //create lines to close pie slice
        context.move_to(
            arc_angle_2.cos() * radius as f64 + center,
            arc_angle_2.sin() * radius as f64 + center,
        );
        context.line_to(center, center);
        context.line_to(
            arc_angle_1.cos() * radius as f64 + center,
            arc_angle_1.sin() * radius as f64 + center,
        );
        //fill pie slice
        let hue = &(230 + radius as i32 * 250 / size).to_string();
        let color = "hsla(".to_owned() + hue + ",80%,50%,0.2)";
        context.set_fill_style(&(color.into()));
        context.fill();

        radius -= arc_spacing as i32;
    }
}
fn orb(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    arc_spacing: f64,
    center: f64,
) {
    let mut radius = size / 2 - 1;
    while radius > 0 {
        context.begin_path();

        let angle = 0.1 * (radius as f64 * current_time) / (arc_spacing / 2.0);
        let arc_angle_2 = angle + PI;
        let arc_angle_1 = -angle;
        let mut cww = true;
        if (arc_angle_1 / (2.0 * PI)) as i64 % 2 == 0 {
            cww = true;
        }
        context
            .arc_with_anticlockwise(center, center, radius as f64, arc_angle_1, arc_angle_2, cww)
            .unwrap();
        context.stroke();
        //create lines to close pie slice
        context.move_to(
            arc_angle_2.cos() * radius as f64 + center,
            arc_angle_2.sin() * radius as f64 + center,
        );
        context.line_to(center, center);
        context.line_to(
            arc_angle_1.cos() * radius as f64 + center,
            arc_angle_1.sin() * radius as f64 + center,
        );
        //fill pie slice
        let hue = &(230 + radius as i32 * 250 / size).to_string();
        let color = "hsla(".to_owned() + hue + ",80%,50%,0.2)";
        context.set_fill_style(&(color.into()));
        context.fill();

        radius -= arc_spacing as i32;
    }
}
fn ball(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    arc_spacing: f64,
    center: f64,
) {
    let mut radius = size / 2 - 1;
    while radius > 0 {
        context.begin_path();

        let angle = 0.1 * ((size - radius) as f64 * current_time) / (arc_spacing / 2.0);
        let arc_angle_2 = angle + PI;
        let arc_angle_1 = -arc_angle_2 + PI;
        let mut cww = true;
        if (arc_angle_1 / (2.0 * PI)) as i64 % 2 == 0 {
            cww = true;
        }
        context
            .ellipse_with_anticlockwise(
                center,
                center,
                radius as f64,
                size as f64 / 2.0,
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
            arc_angle_2.sin() * (size / 2) as f64 + center,
        );
        context.line_to(center, center);
        context.line_to(
            arc_angle_1.cos() * radius as f64 + center,
            arc_angle_1.sin() * (size / 2) as f64 + center,
        );
        //fill pie slice
        let hue = &(230 + radius as i32 * 250 / size).to_string();
        let color = "hsla(".to_owned() + hue + ",80%,50%,0.2)";
        context.set_fill_style(&(color.into()));
        context.fill();

        radius -= arc_spacing as i32;
    }
}
pub fn pattern_builder(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    arc_spacing: f64,
    center: f64,
    ball: bool,
    fast_inside: bool,
    arc_1_speed: i32,
    arc_2_speed: i32,
) {
    let mut radius = size / 2 - 1;

    while radius > 0 {
        //either the speed of the arcs decreases as you move away from the center or increases
        let mut inner_speed = radius;
        if fast_inside {
            inner_speed = size - radius;
        }
        //calcaulate an angle based on the current arc placement and time
        let angle = 0.001 * (inner_speed as f64 * current_time);
        //this arbitrary angle is + PI so arcs are oriented at the top of the screen
        let arc_angle_1 = (angle) * arc_1_speed as f64;
        let arc_angle_2 = (angle + PI) * arc_2_speed as f64;

        ellipse_builder(&context, ball, center, radius, arc_angle_1, arc_angle_2);

        radius -= arc_spacing as i32;
    }
}
pub fn conch(
    size: i32,
    context: web_sys::CanvasRenderingContext2d,
    current_time: f64,
    arc_spacing: f64,
    center: f64,
) {
    let mut radius = size / 2 - 1;
    while radius > 0 {
        let angle = 0.1 * ((size - radius) as f64 * current_time) / (arc_spacing * 10.0);
        let arc_angle_2 = angle + PI;
        let arc_angle_1 = -angle * 2.0;
        ellipse_builder(&context, true, center, radius, arc_angle_1, arc_angle_2);
        radius -= arc_spacing as i32;
    }
}
// let functions = arc_1;
#[wasm_bindgen]
pub fn arcs(
    arc_spacing: f64,
    current_time: f64,
    slider_val: f64,
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
        slider_val,
        center,
        ball,
        fast_inside,
        i32::min(arc_1_speed, arc_2_speed),
        i32::max(arc_1_speed, arc_2_speed),
    );
}
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
