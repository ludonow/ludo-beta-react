import $ from 'jquery';

function card_based_content_responsive() {
    var screen_width = $(window).width()
    var sidebar_width = 100;
    var card_width = 230;
    var card_padding_x = 15;
    var card_padding_top = 10;
    var column_width = card_width + card_padding_x;
    var main_width = screen_width - sidebar_width;

    var total_column = Math.floor(main_width / column_width);

    var content_padding_x = Math.round( (main_width - total_column * column_width + card_padding_x)/2 );
    var main = $('.playground-main');

    main.css('padding-right', sidebar_width + content_padding_x);
    main.css('padding-left', content_padding_x);
    $('.auto-start').css('right', sidebar_width + content_padding_x);

    var total_height_of_column = new Array(total_column); 

    // total_height_of_column array initiation
    for (var i = 0; i < total_column; i++) {
        total_height_of_column[i] = 0;
    }

    var post = 0;
    var post_height = 0;
    var current_col = 0;
    var current_card_distance_x = 0;

    var total_post = main.children().length;

    // positioning column
    for (var post_num = 0; post_num < total_post; post_num++) {
        current_col = post_num % total_column;

        // x axis
        current_card_distance_x = current_col * (card_width + card_padding_x);
        $('.column-' + post_num).css('left', current_card_distance_x);

        // y axis
        $('.post-'+ post_num).css('top', total_height_of_column[current_col]);

        // get height of current post
        post = main.children().children().eq(post_num);
        post_height = post.height();
        total_height_of_column[current_col] = total_height_of_column[current_col] + post_height + card_padding_top;
    }
}

$(window).on('load', function() {
    card_based_content_responsive();
    $( window ).resize(card_based_content_responsive);
});