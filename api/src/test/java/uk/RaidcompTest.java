package uk;

import io.micronaut.runtime.EmbeddedApplication;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;

@MicronautTest
class RaidcompTest {

    @Inject
    EmbeddedApplication<?> application;

    // @Test
    // void testItWorks() {
    //     Assertions.assertTrue(application.isRunning());
    // }

}
