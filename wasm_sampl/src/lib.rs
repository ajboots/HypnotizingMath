extern crate wasm_bindgen;
use std::f64::consts::PI;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn arcs(
    frame_count: f64,
    arc_count: f64,
    ball: bool,
    fast_inside: bool,
    arc_1_speed: i32,
    arc_2_speed: i32,
    gradient_mod: i32,
    color_add: i32,
    color_change_speed: i32,
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

    let max_dimension: i32 = std::cmp::min(canvas.width() as i32, canvas.height() as i32);
    let center = max_dimension as f64 / 2.0;
    context.clear_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());
    let size: i32 = max_dimension;
    pattern_builder(
        size as f64,
        context,
        frame_count,
        arc_count,
        center,
        ball,
        fast_inside,
        i32::min(arc_1_speed, arc_2_speed),
        i32::max(arc_1_speed, arc_2_speed),
        gradient_mod,
        color_add,
        color_change_speed,
    );
}

pub fn pattern_builder(
    size: f64,
    context: web_sys::CanvasRenderingContext2d,
    frame_count: f64,
    total_arcs: f64,
    center: f64,
    ball: bool,
    fast_inside: bool,
    arc_1_speed: i32,
    arc_2_speed: i32,
    gradient_mod: i32,
    color_add: i32,
    color_change_speed: i32,
) {
    let mut radius = size / 2.0;
    let arc_spacing = radius / total_arcs;

    while radius > 0.0 {
        //either the speed of the arcs decreases as you move away from the center or increases
        let inner_speed = if fast_inside { radius } else { size - radius };
        //calcaulate an angle based on the current arc placement and time
        let angle = 0.00001 * (inner_speed as f64 * frame_count);
        //this arbitrary angle is + PI so arcs are oriented at the top of the screen
        let arc_angle_1 = angle * arc_1_speed as f64;
        let arc_angle_2 = (angle * arc_2_speed as f64) + PI;

        let arc_color = ((color_change_speed * frame_count as i32)
            + color_add
            + radius as i32 * gradient_mod / (center as i32))
            % 360;
        ellipse_builder(
            &context,
            ball,
            center,
            radius,
            arc_angle_1,
            arc_angle_2,
            arc_color,
        );

        radius -= arc_spacing;
    }
}
// let functions = arc_1;

fn ellipse_builder(
    context: &web_sys::CanvasRenderingContext2d,
    ball: bool,
    center: f64,
    radius: f64,
    arc_angle_1: f64,
    arc_angle_2: f64,
    arc_color: i32,
) {
    context.begin_path();

    let ellipse_y = if ball { center } else { radius };
    context
        .ellipse_with_anticlockwise(
            center,
            center,
            radius,
            ellipse_y,
            0.0,
            arc_angle_1,
            arc_angle_2,
            true,
        )
        .unwrap();
    context.stroke();
    //create lines to close pie slice
    context.move_to(
        arc_angle_2.cos() * radius + center,
        arc_angle_2.sin() * ellipse_y + center,
    );
    context.line_to(center, center);
    context.line_to(
        arc_angle_1.cos() * radius + center,
        arc_angle_1.sin() * ellipse_y + center,
    );
    //fill pie slice
    let color = "hsla(".to_owned() + &arc_color.to_string() + ",80%,50%,0.2)";
    context.set_fill_style(&(color.into()));
    context.fill();
}
