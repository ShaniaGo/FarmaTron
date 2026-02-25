<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categoria_medicamentos', function (Blueprint $table) {
                $table->id();  // <-- ESTA LÍNEA FALTA
                $table->string('nombre', 100);
                $table->text('descripcion')->nullable();
                $table->string('icono', 50)->nullable();
                $table->integer('orden')->default(0);
                $table->timestamps();  // <-- ESTA TAMBIÉN
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias_medicamentos');
    }
};
